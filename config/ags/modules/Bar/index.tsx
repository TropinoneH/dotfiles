import { App, Astal, Gdk } from "astal/gtk3"
import Date from "./Date"
import AppLauncher from "./AppLauncher"

export default (monitor: Gdk.Monitor) => (
    <window
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
        application={App}
        className="bar"
    >
        <centerbox>
            <box>
                <AppLauncher />
            </box>
            <Date />
            <box></box>
        </centerbox>
    </window>
)
