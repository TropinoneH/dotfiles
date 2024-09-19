const Hyprland = await Service.import("hyprland")

const title = Variable("")
const tooltip = Variable("")

export default (curMonitor = 0) => {
    Hyprland.connect("notify::active", () => {
        const clients = JSON.parse(Utils.exec("hyprctl clients -j"))
        const win = clients
            .filter((c) => c.monitor === curMonitor)
            .sort((a, b) => a.focusHistoryID - b.focusHistoryID)[0]
        title.setValue(
            win.class.length >= userConfigs.bar.title.length
                ? win.class.substring(0, userConfigs.bar.title.length - 1) + "…"
                : win.class,
        )
        tooltip.setValue(`${win.class} | ${win.title} | ${win.pid}`)
    })

    return Widget.EventBox({
        className: "window-title-box",
        child: Widget.Label({
            className: "window-title",
            label: title.bind(),
        }),
        tooltip_text: tooltip.bind(),
    })
}
