import { Gdk } from "astal/gtk3"

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
