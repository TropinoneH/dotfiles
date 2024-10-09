const { Gtk } = imports.gi

import { getAudioIcon } from "../../getIcon.js"

const Audio = await Service.import("audio")

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
                        const spkr = Audio.speaker
                        const className = `menu-active-button ${spkr.is_muted ? "muted" : ""}`
                        return (self.class_name = className)
                    })
                },
                on_primary_click: () => (Audio.speaker.is_muted = !Audio.speaker.is_muted),
                child: Widget.Label({
                    class_name: "menu-active-icon",
                    setup: (self) => {
                        self.hook(
                            Audio,
                            () => {
                                self.label = getAudioIcon(Audio.speaker.stream?.port, "speaker", Audio.speaker.volume)
                            },
                            "speaker-changed",
                        )
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
                        expand: true,
                        wrap: true,
                        label: Audio.bind("speaker").as((v) => v.description || ""),
                    }),
                    Widget.Slider({
                        value: Audio.speaker.bind("volume"),
                        class_name: "menu-active-slider menu-slider",
                        draw_value: false,
                        hexpand: true,
                        min: 0,
                        max: 1,
                        onChange: ({ value }) => (Audio.speaker.volume = value),
                    }),
                ],
            }),
            Widget.Label({
                vpack: "end",
                class_name: "menu-active-percentage",
                label: Audio.speaker.bind("volume").as((v) => `${Math.round(v * 100)}%`),
            }),
        ],
    })
