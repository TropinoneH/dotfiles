import Backlight from "../../service/backlight.js"
import { getBacklightIcon } from "./popWindow/getIcon.js"

export default () => {
    return Widget.Box({
        className: "backlight box",
        child: Widget.EventBox({
            child: Widget.Box({
                children: [
                    Widget.Label({
                        className: "icon",
                        label: Backlight.bind("backlight_value").as((v) => getBacklightIcon(Math.floor(v * 100))),
                    }),
                    Widget.Label({
                        className: "text",
                        label: Backlight.bind("backlight_value").as((v) => ` ${Math.floor(v * 100)}%`),
                    }),
                ],
            }),
            on_scroll_up: () => Utils.exec(userConfigs.bar.scripts.backlight.onScrollUp),
            on_scroll_down: () => Utils.exec(userConfigs.bar.scripts.backlight.onScrollDown),
        }),
    })
}
