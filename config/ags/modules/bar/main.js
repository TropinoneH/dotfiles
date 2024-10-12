import AudioMenu from "./popWindow/AudioMenu/main.js"
import BluetoothMenu from "./popWindow/BluetoothMenu/main.js"
import Calendar from "./popWindow/Calendar/main.js"
import NetworkMenu from "./popWindow/NetworkMenu/main.js"

import AppLauncher from "./AppLauncher.js"
import Audio from "./Audio.js"
import Backlight from "./Backlight.js"
import Battery from "./Battery.js"
import Bluetooth from "./Bluetooth.js"
import Clock from "./Clock.js"
import Network from "./Network.js"
import Powermenu from "./Powermenu.js"
import SysTray from "./SysTray.js"
import WindowTitle from "./WindowTitle.js"
import Workspace from "./Workspaces.js"

// layout of the bar
function Left(/**@type{number}*/ monitor) {
    return Widget.Box({
        spacing: 5,
        children: [AppLauncher(), Workspace(monitor), WindowTitle(monitor)],
    })
}

function Center() {
    return Widget.Box({
        className: "center-bar",
        children: [Clock()],
    })
}

function Right() {
    return Widget.Box({
        spacing: 5,
        hpack: "end",
        children: [Backlight(), Audio(), Battery(), Network(), Bluetooth(), SysTray(), Powermenu()],
    })
}

export const windows = [AudioMenu(), BluetoothMenu(), Calendar(), NetworkMenu()]

/**
 *@param{number} monitor
 */
export default (monitor = 0) => {
    return Widget.Window({
        name: `bar-${monitor}`, // name has to be unique
        monitor,
        anchor: ["top", "left", "right"],
        exclusivity: "exclusive",
        css: "background: transparent",
        child: Widget.CenterBox({
            className: "bar",
            start_widget: Left(monitor),
            center_widget: Center(),
            end_widget: Right(),
        }),
    })
}
