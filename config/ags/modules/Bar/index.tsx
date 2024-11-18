import { Gdk, Gtk } from "astal/gtk3"
import Date from "./Date"
import AppLauncher from "./AppLauncher"
import Workspace from "./Workspace"
import Title from "./Title"
import Powermenu from "./Powermenu"
import SysTray from "./SysTray"
import Bluetooth from "./Bluetooth"
import Network from "./Network"
import Battery from "./Battery"

export default ({ monitor }: { monitor: Gdk.Monitor }) => (
    <centerbox>
        <box halign={Gtk.Align.START}>
            <AppLauncher />
            <Workspace monitor={monitor} />
            <Title monitor={monitor} />
        </box>
        <Date />
        <box halign={Gtk.Align.END}>
            <Battery />
            <Network />
            <Bluetooth />
            <SysTray />
            <Powermenu />
        </box>
    </centerbox>
)
