import { getNetworkIcon } from "../../getIcon.js"

const WIFI_STATUS_MAP = {
    unknown: "Status Unknown",
    unmanaged: "Unmanaged",
    unavailable: "Unavailable",
    disconnected: "Disconnected",
    prepare: "Preparing Connecting",
    config: "Connecting",
    need_auth: "Needs Authentication",
    ip_config: "Requesting IP",
    ip_check: "Checking Access",
    secondaries: "Waiting on Secondaries",
    activated: "Connected",
    deactivating: "Disconnecting",
    failed: "Connection Failed",
}

/**
 *@param {import("types/widgets/box").Box} self
 *@param {import("types/service/network").Network} network
 *@param {import("types/variable").Variable} staging
 *@param {import("types/variable").Variable} connecting
 */
export default (self, network, staging, connecting) => {
    /**
     *@param {String} ssid
     *@param {String} nmcliOutput
     *@returns {String | undefined}
     */
    const getIdBySsid = (ssid, nmcliOutput) => {
        const lines = nmcliOutput.trim().split("\n")
        for (const line of lines) {
            const columns = line.trim().split(/\s{2,}/)
            if (columns[0].includes(ssid)) {
                return columns[1]
            }
        }
    }

    const isValidWifiStatus = (/**@type{String}*/ status) => {
        return status in WIFI_STATUS_MAP
    }

    const getWifiStatus = () => {
        const wifiState = network.wifi.state?.toLowerCase()

        if (wifiState && isValidWifiStatus(wifiState)) {
            return WIFI_STATUS_MAP[wifiState]
        }
        return WIFI_STATUS_MAP["unknown"]
    }

    self.hook(network, () => {
        Utils.merge([staging.bind("value"), connecting.bind("value")], () => {
            let WAPs = network.wifi.access_points

            const dedupeWAPs = () => {
                const dedupMap = {}
                WAPs.forEach((item) => {
                    if (item.ssid !== null && !Object.hasOwnProperty.call(dedupMap, item.ssid)) {
                        dedupMap[item.ssid] = item
                    }
                })

                return Object.keys(dedupMap).map((itm) => dedupMap[itm])
            }

            WAPs = dedupeWAPs()

            const isInStaging = (wap) => Object.keys(staging.value).length === 0 && wap.bssid === staging.value.bssid

            const isDisconnecting = (wap) =>
                wap.ssid === network.wifi.ssid && network.wifi.state.toLowerCase() === "deactivating"

            const filteredWAPs = WAPs.filter((ap) => ap.ssid !== "Unknown" && !isInStaging(ap)).sort((a, b) => {
                if (network.wifi.ssid === a.ssid) return -1
                if (network.wifi.ssid === b.ssid) return 1
                return b.strength - a.strength
            })

            if (filteredWAPs.length <= 0 && Object.keys(staging.value).length === 0) {
                self.child = Widget.Label({
                    class_name: "waps-not-found dim",
                    expand: true,
                    hpack: "center",
                    vpack: "center",
                    label: "No Wi-Fi Networks Found",
                })
                return
            }
            self.children = filteredWAPs.map((ap) =>
                Widget.Box({
                    children: [
                        Widget.Button({
                            on_primary_click: () => {
                                if (ap.bssid === connecting.value || ap.active) {
                                    return
                                }

                                connecting.value = ap.bssid || ""
                                Utils.execAsync(`nmcli device wifi connect ${ap.bssid}`)
                                    .then(() => {
                                        connecting.value = ""
                                        staging.value = {}
                                    })
                                    .catch((err) => {
                                        if (err.toLowerCase().includes("secrets were required, but not provided")) {
                                            staging.value = ap
                                        } else {
                                            Utils.notify({
                                                summary: "Network",
                                                body: err,
                                                timeout: 5000,
                                            })
                                        }
                                        connecting.value = ""
                                    })
                            },
                            class_name: "network-element-item",
                            child: Widget.Box({
                                hexpand: true,
                                children: [
                                    Widget.Box({
                                        hpack: "start",
                                        hexpand: true,
                                        children: [
                                            Widget.Label({
                                                vpack: "start",
                                                class_name: `network-icon wifi ${ap.ssid === network.wifi.ssid ? "active" : ""} txt-icon`,
                                                label: getNetworkIcon(`${ap["iconName"]}`),
                                            }),
                                            Widget.Box({
                                                class_name: "connection-container",
                                                vpack: "center",
                                                vertical: true,
                                                children: [
                                                    Widget.Label({
                                                        vpack: "center",
                                                        class_name: `active-connection ${ap.ssid === network.wifi.ssid ? "active" : ""}`,
                                                        hpack: "start",
                                                        truncate: "end",
                                                        wrap: true,
                                                        label: ap.ssid,
                                                    }),
                                                    Widget.Revealer({
                                                        revealChild: ap.ssid === network.wifi.ssid,
                                                        child: Widget.Label({
                                                            hpack: "start",
                                                            class_name: `connection-status ${ap.ssid === network.wifi.ssid ? "active" : ""} dim`,
                                                            label: getWifiStatus(),
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    Widget.Revealer({
                                        hpack: "end",
                                        vpack: "start",
                                        reveal_child: ap.bssid === connecting.value || isDisconnecting(ap),
                                        child: Widget.Spinner({
                                            vpack: "start",
                                            class_name: "spinner",
                                        }),
                                    }),
                                ],
                            }),
                        }),
                        Widget.Revealer({
                            vpack: "start",
                            reveal_child: ap.bssid !== connecting.value && ap.active,
                            child: Widget.Button({
                                tooltip_text: "Delete/Forget Network",
                                class_name: "menu-button-icon disconnect",
                                on_primary_click: () => {
                                    connecting.value = ap.bssid || ""
                                    Utils.execAsync("nmcli connection show --active").then((res) => {
                                        const connectionId = getIdBySsid(ap.ssid || "", res)

                                        if (connectionId === undefined) {
                                            console.error(
                                                `Error while forgetting "${ap.ssid}": Connection ID not found`,
                                            )
                                            return
                                        }

                                        Utils.execAsync(`nmcli connection delete ${connectionId} "${ap.ssid}"`)
                                            .then(() => (connecting.value = ""))
                                            .catch((err) => {
                                                connecting.value = ""
                                                console.error(`Error while forgetting "${ap.ssid}": ${err}`)
                                            })
                                    })
                                },
                                child: Widget.Label("󰚃"),
                            }),
                        }),
                    ],
                }),
            )
        })
    })
}
