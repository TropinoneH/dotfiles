const { Gtk } = imports.gi

import DropdownWindow from "../../../commonWidget/DropdownWindow.js"
import activeDevices from "./active/main.js"

export default () =>
    DropdownWindow(
        {
            name: "audio-menu",
            className: "audio-menu",
            child: Widget.Box({
                class_name: "dropdown-menu-items",
                hpack: "fill",
                hexpand: true,
                child: Widget.Box({
                    vertical: true,
                    valign: Gtk.Align.CENTER,
                    hpack: "fill",
                    hexpand: true,
                    class_name: "dropdown-menu-items-container",
                    children: [activeDevices()],
                }),
            }),
        },
        "crossfade",
    )
