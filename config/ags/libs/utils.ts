import { App, Gtk } from "astal/gtk3"
import { EventBox, Revealer } from "astal/gtk3/widget"
import AstalHyprland from "gi://AstalHyprland"

export const setDropWindowOffset = (clicked: Gtk.Widget, windowName: string) => {
    const Hyprland = AstalHyprland.get_default()

    // get button middle anchor
    const middleOffset = Math.floor(clicked.get_allocated_width() / 2) - clicked.get_pointer()[0]
    const xOffset = clicked.get_root_window()?.get_pointer()[1] + middleOffset

    // get dropdown widget width
    const revealer = (App.get_window(windowName)?.get_child() as EventBox).get_child() as Revealer
    const width = revealer.get_allocation().width ?? 0

    // get current monitor width
    const monitor = Hyprland.get_monitor(Hyprland.get_focused_monitor().id)
    const scale = monitor.get_scale() ?? 1
    const { width: rawMonitorWidth, height: rawMonitorHeight, transform } = monitor
    const monitorWidth = (transform % 2 !== 0 ? rawMonitorHeight : rawMonitorWidth) / scale

    // calculate offsets
    let leftOffset = xOffset - Math.floor(width / 2)
    let rightOffset = monitorWidth - xOffset - Math.floor(width / 2)
    if (rightOffset < 0) {
        leftOffset -= rightOffset
        rightOffset = 0
    }

    revealer.set_margin_left(leftOffset)
    revealer.set_margin_right(rightOffset)
}
