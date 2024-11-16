import { App, Astal, Gdk } from "astal/gtk3"
import Date from "./Date"
import AppLauncher from "./AppLauncher"
import Workspace from "./Workspace"

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
                <box>
                    <AppLauncher />
                    <Workspace monitor={monitor} />
                </box>
                <Date />
                <box></box>
            </centerbox>
        </window>
    )
}
