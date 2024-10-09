import openWindow from "../commonWidget/openWindow.js"
import CursorClickWidget from "../commonWidget/CursorClickWidget.js"

const Network = await Service.import("network")

const WifiIndicator = () =>
    CursorClickWidget({
        attribute: {},
        child: Widget.Label({ className: "connected", label: "" }),
        tooltip_text: Network.bind("wifi").as(
            (w) => `${userConfigs.bar.network.device_type.wifi} ${w.ssid}(${w.strength}%)`,
        ),
    })

const WiredIndicator = () =>
    CursorClickWidget({
        child: Widget.Label({ className: "connected", label: "" }),
        tooltip_text: Network.bind("wired").as((n) => `Wired ${n.state} ${n.internet}`),
    })

const DisconnectIndicator = () =>
    CursorClickWidget({
        child: Widget.Label({ className: "disconnected", label: "󰖪" }),
    })

/**
 *@param {ReturnType<typeof CursorClickWidget>} widget
 *@returns {ReturnType<typeof CursorClickWidget>}
 */
const Wrapper = (widget) => {
    widget.on_secondary_click = () => Utils.exec(userConfigs.bar.scripts.network)
    widget.on_primary_click = (self, e) =>
        openWindow(self, e, "network-menu", () =>
            App.windows.forEach((w) => {
                if (w.name?.endsWith("-menu")) w.hide()
            }),
        )
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
