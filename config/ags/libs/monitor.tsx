import { Variable } from "astal"
import { App, Astal, Gdk, Gtk } from "astal/gtk3"

const allMonitorsApps = Variable<Gtk.Window[]>([])

export const getMonitor = (gdkmonitor: Gdk.Monitor) => {
    const display = Gdk.Display.get_default()
    const screen = display?.get_default_screen()
    for (let i = 0; i < (display?.get_n_monitors() ?? 1); i++) {
        if (gdkmonitor === display?.get_monitor(i)) {
            return { id: i, name: screen?.get_monitor_plug_name(i) }
        }
    }
    return { id: 0, name: "eDP-1" }
}

export const mapAllMonitors = ([...windows]: (({ monitor }: { monitor: Gdk.Monitor }) => Gtk.Widget)[]) => {
    const windowsList = allMonitorsApps.get()
    for (const win of windowsList) {
        App.remove_window(win)
        win.destroy()
    }

    const newWindows = [] as Gtk.Window[]
    for (const monitor of App.get_monitors()) {
        for (const win of windows) {
            <window
                gdkmonitor={monitor}
                exclusivity={Astal.Exclusivity.EXCLUSIVE}
                anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
                className="bar"
                name={"Bar-" + getMonitor(monitor).id}
                setup={self => { App.add_window(self); newWindows.push(self) }}
            >
                {win({ monitor })}
            </window>
        }
    }
    allMonitorsApps.set(newWindows)
}
