const { Gdk } = imports.gi

export let monitors

// Mixes with Gdk monitor size cuz it reports monitor size scaled
async function updateStuff() {
    monitors = JSON.parse(Utils.exec("hyprctl monitors -j"))
    const display = Gdk.Display.get_default()
    monitors.forEach((monitor, i, _) => {
        const gdkMonitor = display?.get_monitor(i)
        monitor.realWidth = monitor.width
        monitor.realHeight = monitor.height
        if (userConfigs.monitors.scaleMethod === "gdk") {
            monitor.width = gdkMonitor?.get_geometry().width
            monitor.height = gdkMonitor?.get_geometry().height
        } else {
            monitor.width = Math.ceil(monitor.realWidth / monitor.scale)
            monitor.height = Math.ceil(monitor.realHeight / monitor.scale)
        }
    })
}

updateStuff().catch(print)
