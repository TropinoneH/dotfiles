const Hyprland = await Service.import("hyprland")

/**
 * @returns {Array}
 */
export const forAllMonitors = (fn = print) => {
    const monitors = Hyprland.monitors
    const length = monitors.length
    const arr = []
    for (let i = 0; i < length; i++) {
        arr.push(fn(monitors[i].id))
    }
    return arr
}
