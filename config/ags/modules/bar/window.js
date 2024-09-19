const Hyprland = await Service.import("hyprland")

export default (curMonitor = 0) => {
    const clients = Hyprland.bind("clients")
    /**
     *@param {import("types/service/hyprland").Client[]} clients
     *@param {number} curMonitor
     *@paran {String} props
     *@returns {string}
     */
    const getWindowInfo = (clients, curMonitor, props) => {
        const window = clients
            .filter((w) => w.monitor == curMonitor)
            .sort((a, b) => a.focusHistoryID - b.focusHistoryID)[0]
        if (window === undefined) return ""
        else return window[props]
    }

    return Widget.EventBox({
        className: "window-title-box",
        child: Widget.Label({
            className: "window-title",
            label: clients.as((c) => { 
                let clazz = getWindowInfo(c, curMonitor, "class")
                if (clazz.length >= userConfigs.bar.title.length) {
                    clazz = clazz.substring(0, userConfigs.bar.title.length - 1) + "…"
                }
                return clazz
            }),
        }),
        tooltip_text: clients.as((c) => {
            const title = getWindowInfo(c, curMonitor, "title")
            const clazz = getWindowInfo(c, curMonitor, "class")
            const pid = getWindowInfo(c, curMonitor, "pid")
            return `${clazz} -- ${title} -- ${pid}`
        }),
    })
}
