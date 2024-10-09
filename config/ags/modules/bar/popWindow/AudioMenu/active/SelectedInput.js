const { Gtk } = imports.gi

const Audio = await Service.import("audio")

import { getAudioIcon } from "../../getIcon.js"

export default () =>
    Widget.Box({
        class_name: "menu-slider-container",
        valign: Gtk.Align.CENTER,
        children: [
            Widget.Button({
                vexpand: false,
                vpack: "end",
                setup: (self) => {
                    self.hook(Audio, () => {
                        const mic = Audio.microphone
                        const className = `menu-active-button ${mic.is_muted ? "muted" : ""}`
                        return (self.class_name = className)
                    })
                },
                on_primary_click: () => (Audio.microphone.is_muted = !Audio.microphone.is_muted),
                child: Widget.Icon({
                    class_name: "menu-active-icon",
                    setup: (self) => {
                        self.hook(Audio, () => {
                            self.icon = getAudioIcon(Audio.microphone.stream?.port, "microphone", Audio.microphone.volume)
                        })
                    },
                }),
            }),
            Widget.Box({
                vertical: true,
                valign: Gtk.Align.CENTER,
                children: [
                    Widget.Label({
                        class_name: "menu-active",
                        hpack: "start",
                        truncate: "end",
                        wrap: true,
                        label: Audio.bind("microphone").as((v) =>
                            v.description === null ? "No input device found..." : v.description,
                        ),
                    }),
                    Widget.Slider({
                        value: Audio.microphone.bind("volume").as((v) => v),
                        class_name: "menu-active-slider menu-slider",
                        draw_value: false,
                        hexpand: true,
                        min: 0,
                        max: 1,
                        onChange: ({ value }) => (Audio.microphone.volume = value),
                    }),
                ],
            }),
            Widget.Label({
                class_name: "menu-active-percentage",
                vpack: "end",
                label: Audio.microphone.bind("volume").as((v) => `${Math.round(v * 100)}%`),
            }),
        ],
    })
