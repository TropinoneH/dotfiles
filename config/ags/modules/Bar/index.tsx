import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import Date from "./Date"
import AppLauncher from "./AppLauncher"
import Workspace from "./Workspace"
import Title from "./Title"
import Powermenu from "./Powermenu"
import SysTray from "./SysTray"
import Bluetooth from "./Bluetooth"
import Network from "./Network"
import Battery from "./Battery"
import Audio from "./Audio"
import Brightness from "./Brightness"

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

export default (monitor: Gdk.Monitor) => (
    <window
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
        className="bar"
        name={"Bar-" + getMonitor(monitor).id}
        application={App}
    >
        <centerbox>
            <box halign={Gtk.Align.START}>
                <AppLauncher />
                <Workspace monitor={monitor} />
                <Title monitor={monitor} />
            </box>
            <Date />
            <box halign={Gtk.Align.END}>
                <Brightness />
                <Audio />
                <Battery />
                <Network />
                <Bluetooth />
                <SysTray />
                <Powermenu />
            </box>
        </centerbox>
    </window>
)
