import DropdownWindow from "../../../commonWidget/DropdownWindow.js"
import Devices from "./Devices/main.js"

export default () =>
    DropdownWindow(
        {
            name: "bluetooth-menu",
            className: "bluetooth-menu",
            child: Widget.Box({
                class_name: "dropdown-menu-items",
                hpack: "fill",
                hexpand: true,
                child: Widget.Box({
                    vertical: true,
                    hpack: "fill",
                    hexpand: true,
                    class_name: "dropdown-menu-items-container",
                    child: Devices(),
                }),
            }),
        },
        "crossfade",
    )
