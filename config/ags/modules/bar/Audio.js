import openWindow from "../commonWidget/openWindow.js"
import CursorClickWidget from "../commonWidget/CursorClickWidget.js"
import { getAudioIcon } from "./popWindow/getIcon.js"

const Audio = await Service.import("audio")

export default () => {
    const iconLabel = Widget.Label({
        className: "icon",
        label: "",
    })
    const textLabel = Widget.Label({
        label: "",
    })

    Audio.connect("speaker-changed", () => {
        iconLabel.label = getAudioIcon(Audio.speaker.stream?.port, "speaker", Audio.speaker.volume)
        textLabel.toggleClassName("mute", Audio.speaker.stream?.is_muted)
        textLabel.label = Audio.speaker.stream?.is_muted ? " mute" : ` ${Math.round(Audio.speaker.volume * 100)}%`
    })

    return Widget.Box({
        className: "audio box",
        child: CursorClickWidget({
            child: Widget.Box({
                children: [iconLabel, textLabel],
            }),
            on_primary_click: (self, e) =>
                openWindow(self, e, "audio-menu", () =>
                    App.windows.forEach((w) => {
                        if (w.name?.endsWith("-menu")) w.hide()
                    }),
                ),
            on_secondary_click: () => Utils.exec(userConfigs.bar.scripts.volume.onRightClick),
            on_scroll_up: () => Utils.exec(userConfigs.bar.scripts.volume.onScrollUp),
            on_scroll_down: () => Utils.exec(userConfigs.bar.scripts.volume.onScrollDown),
        }),
        tooltip_text: Audio.speaker.bind("description").as(d => d || "Unknown"),
    })
}
