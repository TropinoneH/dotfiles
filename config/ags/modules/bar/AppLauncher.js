import CursorClickWidget from "../commonWidget/CursorClickWidget.js"

export default () =>
    CursorClickWidget({
        child: Widget.Label({
            className: "app-launcher",
            label: "  ",
        }),
        on_primary_click: () => {
            Utils.exec(userConfigs.bar.scripts.appLauncher.onClick)
        },
        on_scroll_up: () => {
            Utils.exec(userConfigs.bar.scripts.appLauncher.onScrollUp)
        },
        on_scroll_down: () => {
            Utils.exec(userConfigs.bar.scripts.appLauncher.onScrollDown)
        },
    })
