import DropdownWindow from "../../../commonWidget/DropdownWindow.js"

export default () => {
    const calendar = Widget.Calendar({
        expand: true,
        hpack: "fill",
        vpack: "fill",
        class_name: "calendar-menu-widget",
        showDayNames: true,
        showHeading: true,
    })

    return DropdownWindow(
        {
            name: "calendar-menu",
            child: Widget.Box({
                class_name: "calendar-menu-content",
                css: "padding: 1px; margin: -1px;",
                vexpand: false,
                children: [
                    Widget.Box({
                        class_name: "calendar-content-container",
                        vertical: true,
                        children: [
                            Widget.Box({
                                class_name: "calendar-menu-item-container",
                                hpack: "fill",
                                vpack: "fill",
                                expand: true,
                                child: Widget.Box({
                                    class_name: "calendar-container-box",
                                    child: calendar,
                                }),
                            }),
                        ],
                    }),
                ],
            }),
        },
        "crossfade",
    ).hook(
        App,
        (_s, wname, _v) => {
            const date = new Date()
            if (wname === "calendar-menu") {
                calendar.select_day(date.getDate())
                calendar.select_month(date.getMonth(), date.getFullYear())
            }
        },
        "window-toggled",
    )
}
