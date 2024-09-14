import { monitors } from "../utils/hyprlandData.js"

const Hyprland = await Service.import("hyprland")

const clickCloseRegion = ({ name, expand = true, fillMonitor = "" }) => {
    return Widget.EventBox({
        child: Widget.Box({
            expand: expand,
            css: `
                min-width: ${fillMonitor.includes("h") ? monitors[Hyprland.active.monitor.id].width : 0}px;
                min-height: ${fillMonitor.includes("v") ? monitors[Hyprland.active.monitor.id].height : 0}px;
            `,
        }),
        setup: (self) =>
            self.on("button-press-event", (self, event) => {
                // Any mouse button
                App.closeWindow(name)
            }),
    })
}

export default clickCloseRegion
