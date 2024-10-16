import openWindow from "../commonWidget/openWindow.js"
import Backlight from "../../service/backlight.js"
import { getBacklightIcon } from "./popWindow/getIcon.js"
import CursorClickWidget from "../commonWidget/CursorClickWidget.js"

export default () =>
    Widget.Box({
        className: "backlight box",
        child: CursorClickWidget({
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
            on_primary_click: (self, e) =>
                openWindow(self, e, "backlight-menu", () =>
                    App.windows.forEach((w) => {
                        if (w.name?.endsWith("-menu")) w.hide()
                    }),
                ),
        }),
    })
