import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import Date from "./Date"
import AppLauncher from "./AppLauncher"
import Workspace from "./Workspace"
import Title from "./Title"
import Powermenu from "./Powermenu"
import SysTray from "./SysTray"
import Bluetooth from "./Bluetooth"

export default (monitor: Gdk.Monitor) => {
    return (
        <window
            gdkmonitor={monitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
            application={App}
            className="bar"
        >
            <centerbox>
                <box halign={Gtk.Align.START}>
                    <AppLauncher />
                    <Workspace monitor={monitor} />
                    <Title monitor={monitor} />
                </box>
                <Date />
                <box halign={Gtk.Align.END}>
                    <Bluetooth />
                    <SysTray />
                    <Powermenu />
                </box>
            </centerbox>
        </window>
    )
}
