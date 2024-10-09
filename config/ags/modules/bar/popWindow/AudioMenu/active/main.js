import SelectedInput from "./SelectedInput.js"
import SelectedPlayback from "./SelectedPlayback.js"

export default () =>
    Widget.Box({
        class_name: "menu-section-container",
        vertical: true,
        children: [
            Widget.Box({
                class_name: "menu-label-container selected",
                hpack: "fill",
                child: Widget.Label({
                    class_name: "menu-label",
                    hexpand: true,
                    hpack: "start",
                    label: "Volume",
                }),
            }),
            Widget.Box({
                class_name: "menu-items-section selected",
                vertical: true,
                children: [
                    Widget.Box({
                        class_name: "menu-active-container",
                        vertical: true,
                        children: [SelectedPlayback()],
                    }),
                    Widget.Box({
                        class_name: "menu-active-container",
                        vertical: true,
                        children: [SelectedInput()],
                    }),
                ],
            }),
        ],
    })
