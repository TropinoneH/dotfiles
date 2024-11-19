const Hyprland = await Service.import("hyprland")


/** @type {import("types/widgets/window").Window<any, unknown>[]} */
const windowList = []

/**
* @param fn {(monitor: number) => import("types/widgets/window").Window<any, unknown>}
* @returns {import("types/widgets/window").Window<any, unknown>[]}
*/
const addAllMonitors = (fn) => {
    windowList.forEach((window) => {
        window.destroy()
    })
    const monitors = Hyprland.monitors
    monitors.forEach((monitor) => {
        windowList.push(fn(monitor.id))
    })

    return windowList
}

/**
* @param fn {(monitor: number) => import("types/widgets/window").Window<any, unknown>}
* @returns {import("types/widgets/window").Window<any, unknown>[]}
*/
export const forAllMonitors = (fn) => {
    Hyprland.connect("monitor-added", () => addAllMonitors(fn))
    Hyprland.connect("monitor-removed", () => addAllMonitors(fn))
    return addAllMonitors(fn)
}
