const Hyprland = await Service.import("hyprland")

/**
 * @returns {Array}
 */
export const forAllMonitors = (fn = print) => {
    const monitors = Hyprland.monitors
    const length = monitors.length
    const arr = []
    for (let i = 0; i < length; i++) {
        const win = fn(monitors[i].id)
        arr.push(win)
    }
    Hyprland.connect("monitor-added", (_, /**@type{string}*/ name) => {
        const monitor = Hyprland.monitors.find((mon) => mon.name === name)
        if (monitor === undefined) return
        const win = fn(monitor.id)
        if (win !== undefined) {
            App.addWindow(win)
            arr.push(win)
        }
    })
    Hyprland.connect("monitor-removed", (_, /**@type{string}*/ name) => {
        const monitor = Hyprland.monitors.find((mon) => mon.name === name)
        if (monitor === undefined) return
        arr.forEach((item) => {
            if (item.monitor == monitor.id) App.removeWindow(item)
        })
    })
    return arr
}
