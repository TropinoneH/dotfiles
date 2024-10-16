import Backlight from "../../../../service/backlight.js"
import { getBacklightIcon } from "../getIcon.js"

const LightSlider = () =>
    Widget.Box({
        className: "menu-slider-container",
        children: [
            Widget.Label({
                className: "icon",
                label: Backlight.bind("backlight_value").as((v) => getBacklightIcon(Math.floor(v * 100)))
            }),
            Widget.Slider({
                className: "menu-active-slider menu-slider",
                value: Backlight.bind("backlight_value"),
                min: 0,
                max: 1,
                hexpand: true,
                drawValue: false,
                onChange: ({ value }) => (Backlight.backlight_value = value),
            }),
        ],
    })

export default () =>
    Widget.Box({
        className: "menu-section-container",
        vertical: true,
        children: [
            Widget.Box({
                class_name: "menu-label-container selected",
                hpack: "fill",
                child: Widget.Label({
                    class_name: "menu-label",
                    hexpand: true,
                    hpack: "start",
                    label: "Backlight",
                }),
            }),
            Widget.Box({
                class_name: "menu-items-section selected",
                vertical: true,
                children: [
                    Widget.Box({
                        class_name: "menu-active-container",
                        vertical: true,
                        children: [LightSlider()],
                    }),
                ],
            }),
        ],
    })
