import ConnectedControls from "./ConnectedControls.js"
import { getBluetoothIcon } from "../../getIcon.js"

/**
 *@param {import("types/service/bluetooth").Bluetooth} bluetooth
 *@param {import("types/widgets/box").Box} self
 */
export default (bluetooth, self) => {
    self.hook(bluetooth, () => {
        if (!bluetooth.enabled) {
            self.child = Widget.Box({
                class_name: "bluetooth-items",
                vertical: true,
                expand: true,
                vpack: "center",
                hpack: "center",
                children: [
                    Widget.Label({
                        class_name: "bluetooth-disabled dim",
                        hexpand: true,
                        label: "Bluetooth is disabled",
                    }),
                ],
            })
            return
        }

        const availableDevices = bluetooth.devices
            .filter((btDev) => btDev.name !== null)
            .sort((a, b) => {
                if (a.connected || a.paired) return -1
                if (b.connected || b.paired) return 1
                return b.name - a.name
            })

        const conDevNames = availableDevices.filter((d) => d.connected || d.paired).map((d) => d.address)

        if (!availableDevices.length) {
            self.child = Widget.Box({
                class_name: "bluetooth-items",
                vertical: true,
                expand: true,
                vpack: "center",
                hpack: "center",
                children: [
                    Widget.Label({
                        class_name: "no-bluetooth-devices dim",
                        hexpand: true,
                        label: "No devices currently found",
                    }),
                    Widget.Label({
                        class_name: "search-bluetooth-label dim",
                        hexpand: true,
                        label: "Press '󰑐' to search",
                    }),
                ],
            })
            return
        }

        self.child = Widget.Box({
            vertical: true,
            children: availableDevices.map((device) =>
                Widget.Box({
                    children: [
                        Widget.Button({
                            hexpand: true,
                            class_name: `bluetooth-element-item`,
                            on_primary_click: () => {
                                if (!conDevNames.includes(device.address)) device.setConnection(true)
                            },
                            child: Widget.Box({
                                hexpand: true,
                                children: [
                                    Widget.Box({
                                        hexpand: true,
                                        hpack: "start",
                                        children: [
                                            Widget.Label({
                                                vpack: "start",
                                                class_name: `menu-button-icon ${conDevNames.includes(device.address) ? "active" : ""} txt-icon`,
                                                label: getBluetoothIcon(`${device["icon_name"]}-symbolic`),
                                            }),
                                            Widget.Box({
                                                vertical: true,
                                                vpack: "center",
                                                children: [
                                                    Widget.Label({
                                                        vpack: "center",
                                                        hpack: "start",
                                                        class_name: "menu-button-name",
                                                        truncate: "end",
                                                        wrap: true,
                                                        label: device.alias,
                                                    }),
                                                    Widget.Revealer({
                                                        hpack: "start",
                                                        reveal_child: device.connected || device.paired,
                                                        child: Widget.Label({
                                                            hpack: "start",
                                                            class_name: "connection-status dim",
                                                            label: device.connected ? "Connected" : "Paired",
                                                        }),
                                                    }),
                                                ],
                                            }),
                                            Widget.Revealer({
                                                hpack: "start",
                                                reveal_child: device.connected || device.paired,
                                                child: Widget.Label({
                                                    vpack: "start",
                                                    class_name: `menu-button-icon ${conDevNames.includes(device.address) ? "active" : ""} txt-icon`,
                                                    label: device.bind("battery_percentage").as(p => getBluetoothIcon(Math.floor((p - 1) / 10).toString(), "battery")),
                                                }),
                                            }),
                                        ],
                                    }),
                                    Widget.Box({
                                        hpack: "end",
                                        children: device.connecting
                                            ? [
                                                  Widget.Spinner({
                                                      vpack: "start",
                                                      class_name: "spinner",
                                                  }),
                                              ]
                                            : [],
                                    }),
                                ],
                            }),
                            tooltip_text: device.alias,
                        }),
                        ConnectedControls(device, conDevNames),
                    ],
                }),
            ),
        })
    })
}
