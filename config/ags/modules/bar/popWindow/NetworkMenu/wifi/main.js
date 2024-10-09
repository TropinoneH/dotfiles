import WAPs from "./WirelessAPs.js"
import WapStaging from "./WapStaging.js"

const Network = await Service.import("network")

const searchInProgress = Variable(false)
const startRotation = () => {
    searchInProgress.value = true
    setTimeout(() => {
        searchInProgress.value = false
    }, 5 * 1000)
}
const Staging = Variable({})
const Connecting = Variable("")

export default () =>
    Widget.Box({
        class_name: "menu-section-container",
        vertical: true,
        children: [
            Widget.Box({
                class_name: "menu-label-container",
                hpack: "fill",
                children: [
                    Widget.Label({
                        class_name: "menu-label",
                        hpack: "start",
                        label: "Wi-Fi",
                    }),
                    Widget.Label({
                        className: "menu-icon",
                        hexpand: true,
                        hpack: "start",
                        label: " ",
                        tooltip_text: Network.bind("wifi").as(() => {
                            const curNet = JSON.parse(Utils.exec("ip -j addr")).filter((i) =>
                                i["ifname"].includes(userConfigs.bar.network.device_type.wifi),
                            )[0]
                            const netInfo = curNet["addr_info"].filter((i) => i["family"] === "inet")[0]
                            return `${curNet["ifname"]}: ${netInfo["local"]}/${netInfo["prefixlen"]}`
                        }),
                    }),
                    Widget.Button({
                        vpack: "center",
                        hpack: "end",
                        class_name: "menu-button-icon",
                        on_primary_click: () => {
                            startRotation()
                            Network.wifi.scan()
                        },
                        child: Widget.Icon({
                            class_name: searchInProgress.bind("value").as((v) => (v ? "spinning" : "")),
                            icon: "view-refresh-symbolic",
                        }),
                    }),
                ],
            }),
            Widget.Box({
                class_name: "menu-items-section",
                vertical: true,
                children: [
                    Widget.Box({
                        setup: (self) => {
                            WapStaging(self, Network, Staging, Connecting)
                        },
                    }),
                    Widget.Box({
                        vertical: true,
                        setup: (self) => {
                            WAPs(self, Network, Staging, Connecting)
                        },
                    }),
                ],
            }),
        ],
    })
