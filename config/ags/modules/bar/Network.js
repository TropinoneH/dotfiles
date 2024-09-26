const { Gtk } = imports.gi

import CursorClickWidget from "../commonWidget/CursorClickWidget.js"

const Network = await Service.import("network")

const WifiIndicator = () => {
    const ipInfo = Variable({ ifname: "", local: "", prefixlen: "" })
    const menu = Widget.Menu({
        className: "menu",
        children: ipInfo.bind().as((ip) => {
            const curSSID = Utils.exec(
                `bash -c "nmcli d show wlan0 | grep GENERAL.CONNECTION: | cut -d\\: -f2"`,
            ).trimStart()
            return [
                Widget.MenuItem({
                    className: "menu-item",
                    child: Widget.Label({
                        label: `${ip.ifname}: ${curSSID} ${ip.local}/${ip.prefixlen}`,
                    }),
                }),
            ]
        }),
    })
    return CursorClickWidget({
        attribute: {},
        child: Widget.Label({ className: "connected", label: "" }),
        tooltip_text: Network.bind("wifi").as(
            (w) => `${userConfigs.bar.network.device_type.wifi} ${w.ssid}(${w.strength}%)`,
        ),
        on_primary_click: (_, e) => {
            const curNet = JSON.parse(Utils.exec("ip -j addr")).filter((i) =>
                i["ifname"].includes(userConfigs.bar.network.device_type.wifi),
            )[0]
            const netInfo = curNet["addr_info"].filter((i) => i["family"] === "inet")[0]
            ipInfo.setValue({
                ifname: curNet["ifname"],
                local: netInfo["local"],
                prefixlen: netInfo["prefixlen"],
            })
            menu.popup_at_pointer(e)
        },
    })
}

const WiredIndicator = () => {
    const ipInfo = Variable({ local: "", prefixlen: "", ifname: "" })
    const menu = Widget.Menu({
        className: "menu",
        children: [
            Widget.MenuItem({
                className: "menu-item",
                child: Widget.Box({
                    children: [
                        Widget.Icon({
                            className: "icon",
                            icon: Network.wired.bind("icon_name"),
                        }),
                        Widget.Label({
                            label: ipInfo.bind().as((ip) => ` ${ip.ifname}: ${ip.local}/${ip.prefixlen}`),
                        }),
                    ],
                }),
            }),
        ],
    })
    return CursorClickWidget({
        child: Widget.Label({ className: "connected", label: "" }),
        on_primary_click: (_, e) => {
            const curNet = JSON.parse(Utils.exec("ip -j addr")).filter((i) =>
                i["ifname"].includes(userConfigs.bar.network.device_type.wired),
            )[0]
            const netInfo = curNet["addr_info"].filter((i) => i["family"] === "inet")[0]
            ipInfo.setValue({
                ifname: curNet["ifname"],
                local: netInfo["local"],
                prefixlen: netInfo["prefixlen"],
            })
            menu.popup_at_pointer(e)
        },
        tooltip_text: Network.bind("wired").as((n) => `Wired ${n.state} ${n.internet}`),
    })
}

const DisconnectIndicator = () => {
    return CursorClickWidget({
        child: Widget.Label({ className: "disconnected", label: "󰖪" }),
    })
}

/**
 *@param {ReturnType<typeof CursorClickWidget>} widget
 *@returns {ReturnType<typeof CursorClickWidget>}
 */
const Wrapper = (widget) => {
    widget.on_secondary_click = () => Utils.exec(userConfigs.bar.scripts.network)
    return widget
}

export default () => {
    return Widget.Stack({
        className: "network box",
        children: {
            wifi: Wrapper(WifiIndicator()),
            wired: Wrapper(WiredIndicator()),
            disconnect: Wrapper(DisconnectIndicator()),
        },
        shown: Network.bind("primary").as((p) => p || "disconnect"),
    })
}
