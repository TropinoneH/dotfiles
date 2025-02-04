import { App, Gdk, Gtk } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./modules/Bar"
import NotificationPopups from "./modules/Notifications"

const mapMonitor = (monitor: Gdk.Monitor) => {
    return [Bar(monitor)]
}

App.start({
    css: style,
    main() {
        const bars = new Map<Gdk.Monitor, Gtk.Widget[]>()

        NotificationPopups(App.get_monitors()[0])

        // initialize
        for (const gdkMonitor of App.get_monitors()) {
            bars.set(gdkMonitor, mapMonitor(gdkMonitor))
        }

        App.connect("monitor-added", (_, gdkMonitor) => {
            bars.set(gdkMonitor, mapMonitor(gdkMonitor))
        })

        App.connect("monitor-removed", (_, gdkMonitor) => {
            bars.get(gdkMonitor)?.map(item => item.destroy())
            bars.delete(gdkMonitor)
        })
    }
})
