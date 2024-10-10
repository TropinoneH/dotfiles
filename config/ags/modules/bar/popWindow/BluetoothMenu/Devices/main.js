import Label from "./Label.js"
import DeviceList from "./DeviceList.js"

const Bluetooth = await Service.import("bluetooth")

export default () =>
    Widget.Box({
        class_name: "menu-section-container",
        vertical: true,
        children: [
            Label(Bluetooth),
            Widget.Box({
                class_name: "menu-items-section",
                child: Widget.Box({
                    class_name: "menu-content",
                    vertical: true,
                    setup: (self) => {
                        DeviceList(Bluetooth, self)
                    },
                }),
            }),
        ],
    })
