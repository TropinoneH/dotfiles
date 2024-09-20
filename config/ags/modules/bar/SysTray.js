const SystemTray = await Service.import("systemtray")

export default () => {
    const items = SystemTray.bind("items").as((items) =>
        items.map((item) =>
            Widget.Button({
                child: Widget.Icon({ icon: item.bind("icon") }),
                on_primary_click: (_, event) => item.activate(event),
                on_secondary_click: (_, event) => item.openMenu(event),
                tooltip_markup: item.bind("tooltip_markup"),
            }),
        ),
    )

    return Widget.Box({
        className: "system-tray-box",
        children: items,
    })
}
