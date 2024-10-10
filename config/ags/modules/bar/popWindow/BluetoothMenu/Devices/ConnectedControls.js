/**
 *@param{import("types/service/bluetooth").BluetoothDevice} dev
 *@param{import("types/service/bluetooth").BluetoothDevice[]} connectedDevices
 */
export default (dev, connectedDevices) => {
    if (!connectedDevices.includes(dev.address)) {
        return Widget.Box({})
    }

    return Widget.Box({
        vpack: "start",
        children: [
            Widget.Button({
                class_name: `menu-button-icon ${dev.paired ? "dis" : "enable"}`,
                tooltip_text: dev.paired ? "Unpair" : "Pair",
                child: Widget.Label({
                    label: dev.paired ? "" : "",
                }),
                on_primary_click: () =>
                    Utils.execAsync([
                        "bash",
                        "-c",
                        `bluetoothctl ${dev.paired ? "unpair" : "pair"} ${dev.address}`,
                    ]).catch((err) =>
                        console.error(`bluetoothctl ${dev.paired ? "dis" : "enable"} ${dev.address}`, err),
                    ),
            }),
            Widget.Button({
                class_name: `menu-button-icon ${dev.connected ? "dis" : "enable"}`,
                tooltip_text: dev.connected ? "Disconnect" : "Connect",
                child: Widget.Label({
                    label: dev.connected ? "󱘖" : "",
                }),
                on_primary_click: () => dev.setConnection(!dev.connected),
            }),
            Widget.Button({
                class_name: `menu-button-icon ${dev.trusted ? "dis" : "enable"}`,
                tooltip_text: dev.trusted ? "Untrust" : "Trust",
                child: Widget.Label({
                    label: dev.trusted ? "" : "󱖡",
                }),
                on_primary_click: () =>
                    Utils.execAsync([
                        "bash",
                        "-c",
                        `bluetoothctl ${dev.trusted ? "untrust" : "trust"} ${dev.address}`,
                    ]).catch((err) =>
                        console.error(`bluetoothctl ${dev.trusted ? "untrust" : "trust"} ${dev.address}`, err),
                    ),
            }),
            Widget.Button({
                class_name: "menu-button-icon dis",
                tooltip_text: "Forget",
                child: Widget.Label({
                    label: "󰆴",
                }),
                on_primary_click: () => {
                    Utils.execAsync(["bash", "-c", `bluetoothctl remove ${dev.address}`]).catch((err) =>
                        console.error("Bluetooth Remove", err),
                    )
                },
            }),
        ],
    })
}
