import CursorClickWidget from "../commonWidget/CursorClickWidget.js"

export default () => CursorClickWidget({
    child: Widget.Label({
        className: "powermenu-icon",
        label: "⏻",
    }),
    on_primary_click: () => Utils.exec(userConfigs.bar.scripts.powermenu),
    on_secondary_click: () => Utils.exec(userConfigs.bar.scripts.powermenu),
})
