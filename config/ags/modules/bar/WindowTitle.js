const Hyprland = await Service.import("hyprland")

export default (curMonitor = 0) => {
    const title = Variable("")
    const tooltip = Variable("")

    Hyprland.connect("notify::active", () => {
        const /**@type{import("types/service/hyprland").Client[]}*/ clients = JSON.parse(
                Utils.exec("hyprctl clients -j"),
            )
        const win = clients
            .filter((c) => c.monitor === curMonitor)
            .sort((a, b) => a.focusHistoryID - b.focusHistoryID)[0]
        if (win === undefined) {
            title.setValue("")
            tooltip.setValue("")
            return
        }
        title.setValue(
            win.class.length >= userConfigs.bar.title.length
                ? win.class.substring(0, userConfigs.bar.title.length - 1) + "…"
                : win.class,
        )
        tooltip.setValue(`${win.class} | ${win.title} | ${win.pid}`)
    })

    setTimeout(() => {
        const win = Hyprland.clients.filter((c) => c.monitor === curMonitor)
            .sort((a, b) => a.focusHistoryID - b.focusHistoryID)[0]
        if (win === undefined) {
            title.setValue("")
            tooltip.setValue("")
            return
        }
        title.setValue(
            win.class.length >= userConfigs.bar.title.length
                ? win.class.substring(0, userConfigs.bar.title.length - 1) + "…"
                : win.class,
        )
        tooltip.setValue(`${win.class} | ${win.title} | ${win.pid}`)
    }, 100)

    return Widget.EventBox({
        className: "window-title box",
        child: Widget.Label({
            className: "window-title",
            label: title.bind(),
        }),
        tooltip_markup: tooltip.bind().as((t) => `<span background="#191a24"> ${t} </span>`),
    })
}
