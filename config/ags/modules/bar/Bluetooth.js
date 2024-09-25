const { Gdk } = imports.gi

import CursorClickWidget from "../commonWidget/CursorClickWidget.js"

const Bluetooth = await Service.import("bluetooth")

export default () => {
    const deviceItem = (/**@type{import("types/service/bluetooth.js").BluetoothDevice}*/ device) => {
        const itemBox = Widget.Box({
            spacing: 15,
            children: [
                Widget.Label({
                    label: "󰂱 " + device.name + " 󰂄" + device.battery_percentage + "%",
                }),
                Widget.Switch({
                    className: "switch",
                    active: device.bind("connected"),
                    setup: (self) =>
                        Utils.timeout(100, () => {
                            self.toggleClassName("disable-switch", !device.connected)
                        }),
                }),
            ],
        })
        return Widget.MenuItem({
            className: "menu-item",
            child: itemBox,
            onActivate: (self) => {
                device.setConnection(!device.connected)
                itemBox.children[1].toggleClassName("disable-switch", device.connected)
            },
            onSelect: (self) => {
                self.toggleClassName("selected-menu-item", true)
                const display = Gdk.Display.get_default()
                if (!display) return
                self.window.set_cursor(Gdk.Cursor.new_from_name(display, "pointer"))
            },
            onDeselect: (self) => {
                self.toggleClassName("selected-menu-item", false)
                self.window.set_cursor(null)
            },
            tooltip_markup: device
                .bind("device")
                .as(
                    (d) =>
                        `<span background="#191a24">${d.address} ${d.name} ${d.battery_percentage}% ${d.connected ? "connected" : "disconnected"} ${d.paired ? "paired" : "unpaired"} ${d.trusted ? "trusted" : "untrusted"}</span>`,
                ),
        })
    }

    const menu = Widget.Menu({
        className: "menu",
        children: Bluetooth.bind("devices").as((devices) => Array.from(devices.map((device) => deviceItem(device)))),
    })

    return CursorClickWidget({
        child: Widget.Box({
            className: "bluetooth box",
            children: [
                Widget.Label({
                    className: "icon",
                    label: "",
                }),
                Widget.Label({
                    label: Bluetooth.bind("connected_devices").as((d) => `${d.length !== 0 ? " " + d.length : ""}`),
                }),
            ],
        }),
        on_primary_click: (_, e) => menu.popup_at_pointer(e),
        on_secondary_click: () => Utils.execAsync(userConfigs.bar.scripts.bluetooth),
    })
}
