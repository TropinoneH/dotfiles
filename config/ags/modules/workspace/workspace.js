const { Gtk, Gdk } = imports.gi

import { monitors } from "../utils/hyprlandData.js"
import Window from "./window.js"

const Hyprland = await Service.import("hyprland")

const NUM_OF_WORKSPACES_SHOWN = userConfigs.overview.numOfCols * userConfigs.overview.numOfRows
const TARGET = [Gtk.TargetEntry.new("text/plain", Gtk.TargetFlags.SAME_APP, 0)]

export default (
    /**@type{number}*/ index,
    /**@type{number}*/ overviewMonitor,
    /**@type{ReturnType<typeof Variable<boolean>>}*/ overviewTick,
    /**@type{Map}*/ clientMap,
) => {
    const fixed = Widget.Box({
        attribute: {
            put: (widget, x, y) => {
                if (!widget.attribute) return
                // Note: x and y are already multiplied by userConfigs.overview.scale
                const newCss = `
                        margin-left: ${Math.round(x)}px;
                        margin-top: ${Math.round(y)}px;
                        margin-right: -${Math.round(x + widget.attribute.w * userConfigs.overview.scale)}px;
                        margin-bottom: -${Math.round(y + widget.attribute.h * userConfigs.overview.scale)}px;
                    `
                widget.css = newCss
                fixed.pack_start(widget, false, false, 0)
            },
            move: (widget, x, y) => {
                if (!widget) return
                if (!widget.attribute) return
                // Note: x and y are already multiplied by userConfigs.overview.scale
                const newCss = `
                        margin-left: ${Math.round(x)}px;
                        margin-top: ${Math.round(y)}px;
                        margin-right: -${Math.round(x + widget.attribute.w * userConfigs.overview.scale)}px;
                        margin-bottom: -${Math.round(y + widget.attribute.h * userConfigs.overview.scale)}px;
                    `
                widget.css = newCss
            },
        },
    })
    const WorkspaceNumber = ({ index, ...rest }) => {
        return Widget.Label({
            className: "overview-tasks-workspace-number",
            label: `${index}`,
            css: `
                margin: ${Math.min(monitors[overviewMonitor].width, monitors[overviewMonitor].height) * userConfigs.overview.scale * userConfigs.overview.wsNumMarginScale}px;
                font-size: ${monitors[overviewMonitor].height * userConfigs.overview.scale * userConfigs.overview.wsNumScale}px;
            `,
            setup: (self) =>
                self.hook(Hyprland.active.workspace, (self) => {
                    // Update when going to new ws group
                    const currentGroup = Math.floor((Hyprland.active.workspace.id - 1) / NUM_OF_WORKSPACES_SHOWN)
                    self.label = `${currentGroup * NUM_OF_WORKSPACES_SHOWN + index}`
                }),
            ...rest,
        })
    }
    const widget = Widget.Box({
        className: "overview-tasks-workspace",
        vpack: "center",
        // Rounding and adding 1px to minimum width/height to work around scaling inaccuracy:
        css: `
                min-width: ${1 + Math.round(monitors[overviewMonitor].width * userConfigs.overview.scale)}px;
                min-height: ${1 + Math.round(monitors[overviewMonitor].height * userConfigs.overview.scale)}px;
            `,
        children: [
            Widget.EventBox({
                hexpand: true,
                onPrimaryClick: () => {
                    Hyprland.messageAsync(`dispatch workspace ${index}`)
                    App.closeWindow("overview")
                },
                setup: (eventbox) => {
                    eventbox.drag_dest_set(Gtk.DestDefaults.ALL, TARGET, Gdk.DragAction.COPY)
                    eventbox.connect("drag-data-received", (_w, _c, _x, _y, data) => {
                        const offset =
                            Math.floor((Hyprland.active.workspace.id - 1) / NUM_OF_WORKSPACES_SHOWN) *
                            NUM_OF_WORKSPACES_SHOWN
                        Hyprland.messageAsync(
                            `dispatch movetoworkspacesilent ${index + offset},address:${data.get_text()}`,
                        )
                        overviewTick.setValue(!overviewTick.value)
                    })
                },
                child: Widget.Overlay({
                    child: Widget.Box({}),
                    overlays: [WorkspaceNumber({ index: index, hpack: "start", vpack: "start" }), fixed],
                }),
            }),
        ],
        setup: self => self.hook(Hyprland.active.monitor, (self) => {
            overviewMonitor = Hyprland.active.monitor.id
            self.css = `
                    min-width: ${1 + Math.round(monitors[overviewMonitor].width * userConfigs.overview.scale)}px;
                    min-height: ${1 + Math.round(monitors[overviewMonitor].height * userConfigs.overview.scale)}px;
                `
        })
    })
    const offset = Math.floor((Hyprland.active.workspace.id - 1) / NUM_OF_WORKSPACES_SHOWN) * NUM_OF_WORKSPACES_SHOWN
    fixed.attribute.put(WorkspaceNumber({ index: offset + index }), 0, 0)
    widget.clear = () => {
        const offset =
            Math.floor((Hyprland.active.workspace.id - 1) / NUM_OF_WORKSPACES_SHOWN) * NUM_OF_WORKSPACES_SHOWN
        clientMap.forEach((client, address) => {
            if (!client) return
            if (
                client.attribute.ws <= offset ||
                client.attribute.ws > offset + NUM_OF_WORKSPACES_SHOWN ||
                client.attribute.ws == offset + index
            ) {
                client.destroy()
                client = null
                clientMap.delete(address)
            }
        })
    }
    widget.set = (clientJson, screenCoords) => {
        let c = clientMap.get(clientJson.address)
        if (c) {
            if (c.attribute?.ws !== clientJson.workspace.id) {
                c.destroy()
                c = null
                clientMap.delete(clientJson.address)
            } else if (c) {
                c.attribute.w = clientJson.size[0]
                c.attribute.h = clientJson.size[1]
                c.attribute.updateIconSize(c)
                fixed.attribute.move(
                    c,
                    Math.max(0, clientJson.at[0] * userConfigs.overview.scale),
                    Math.max(0, clientJson.at[1] * userConfigs.overview.scale),
                )
                return
            }
        }
        const newWindow = Window(clientJson, screenCoords, overviewTick)
        if (newWindow === null) return
        // clientMap.set(clientJson.address, newWindow);
        fixed.attribute.put(
            newWindow,
            Math.max(0, newWindow.attribute.x * userConfigs.overview.scale),
            Math.max(0, newWindow.attribute.y * userConfigs.overview.scale),
        )
        clientMap.set(clientJson.address, newWindow)
    }
    widget.unset = (clientAddress) => {
        const offset =
            Math.floor((Hyprland.active.workspace.id - 1) / NUM_OF_WORKSPACES_SHOWN) * NUM_OF_WORKSPACES_SHOWN
        let c = clientMap.get(clientAddress)
        if (!c) return
        c.destroy()
        c = null
        clientMap.delete(clientAddress)
    }
    widget.show = () => {
        fixed.show_all()
    }
    return widget
}
