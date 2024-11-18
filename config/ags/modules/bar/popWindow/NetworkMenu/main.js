import DropdownWindow from "../../../commonWidget/DropdownWindow.js"
import Ethernet from "./ethernet/main.js"
import Wifi from "./wifi/main.js"

export default () =>
    DropdownWindow(
        {
            name: "network-menu",
            className: "network-menu",
            child: Widget.Box({
                className: "dropdown-menu-items",
                child: Widget.Box({
                    className: "dropdown-menu-items-container",
                    vertical: true,
                    hexpand: true,
                    children: [Ethernet(), Wifi()],
                }),
            }),
        },
        "crossfade",
    )
