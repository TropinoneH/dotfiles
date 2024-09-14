const { Gdk, Gtk } = imports.gi
const { Gravity } = imports.gi.Gdk

import { iconExists, substitute, MaterialIcon } from "../utils/icon.js"
import { monitors } from "../utils/hyprlandData.js"
import { dumpToWorkspace, swapWorkspace } from "./action.js"
import ContextMenuWorkspaceArray from "./contentMenuWorkspaceArray.js"

const Hyprland = await Service.import("hyprland")
const TARGET = [Gtk.TargetEntry.new("text/plain", Gtk.TargetFlags.SAME_APP, 0)]

export default (
    { address, at: [x, y], size: [w, h], workspace: { id, name }, class: c, initialClass, monitor, title, xwayland },
    screenCoords,
    /**@type{ReturnType<typeof Variable<boolean>>}*/ overviewTick,
) => {
    const revealInfoCondition = Math.min(w, h) * userConfigs.overview.scale > 70
    if (w <= 0 || h <= 0 || (c === "" && title === "")) return null
    // Non-primary monitors
    if (screenCoords.x != 0) x -= screenCoords.x
    if (screenCoords.y != 0) y -= screenCoords.y
    // Other offscreen adjustments
    if (x + w <= 0) x += Math.floor(x / monitors[monitor].width) * monitors[monitor].width
    else if (x < 0) {
        w = x + w
        x = 0
    }
    if (y + h <= 0) x += Math.floor(y / monitors[monitor].height) * monitors[monitor].height
    else if (y < 0) {
        h = y + h
        y = 0
    }
    // Truncate if offscreen
    if (x + w > monitors[monitor].width) w = monitors[monitor].width - x
    if (y + h > monitors[monitor].height) h = monitors[monitor].height - y

    if (c.length == 0) c = initialClass
    const iconName = substitute(c)
    const appIcon = iconExists(iconName)
        ? Widget.Icon({
              icon: iconName,
              size: (Math.min(w, h) * userConfigs.overview.scale) / 2.5,
          })
        : MaterialIcon("terminal", "gigantic", {
              css: `font-size: ${(Math.min(w, h) * userConfigs.overview.scale) / 2.5}px`,
          })
    return Widget.Button({
        attribute: {
            address,
            x,
            y,
            w,
            h,
            ws: id,
            updateIconSize: (self) => {
                appIcon.size = (Math.min(self.attribute.w, self.attribute.h) * userConfigs.overview.scale) / 2.5
            },
        },
        className: "overview-tasks-window",
        hpack: "start",
        vpack: "start",
        css: `
                margin-left: ${Math.round(x * userConfigs.overview.scale)}px;
                margin-top: ${Math.round(y * userConfigs.overview.scale)}px;
                margin-right: -${Math.round((x + w) * userConfigs.overview.scale)}px;
                margin-bottom: -${Math.round((y + h) * userConfigs.overview.scale)}px;
            `,
        onClicked: (self) => {
            Hyprland.messageAsync(`dispatch focuswindow address:${address}`)
            App.closeWindow("overview")
        },
        onMiddleClickRelease: () => Hyprland.messageAsync(`dispatch closewindow address:${address}`),
        onSecondaryClick: (button) => {
            button.toggleClassName("overview-tasks-window-selected", true)
            const menu = Widget.Menu({
                className: "menu",
                children: [
                    Widget.MenuItem({
                        child: Widget.Label({
                            xalign: 0,
                            label: "Close (Middle-click)",
                        }),
                        onActivate: () => Hyprland.messageAsync(`dispatch closewindow address:${address}`),
                    }),
                    ContextMenuWorkspaceArray(
                        {
                            label: "Dump windows to workspace",
                            actionFunc: dumpToWorkspace,
                            thisWorkspace: Number(id),
                        },
                        overviewTick,
                    ),
                    ContextMenuWorkspaceArray(
                        {
                            label: "Swap windows with workspace",
                            actionFunc: swapWorkspace,
                            thisWorkspace: Number(id),
                        },
                        overviewTick,
                    ),
                ],
            })
            menu.connect("deactivate", () => {
                button.toggleClassName("overview-tasks-window-selected", false)
            })
            menu.connect("selection-done", () => {
                button.toggleClassName("overview-tasks-window-selected", false)
            })
            menu.popup_at_widget(button.get_parent(), Gravity.SOUTH, Gravity.NORTH, null) // Show menu below the button
            button.connect("destroy", () => menu.destroy())
        },
        child: Widget.Box({
            homogeneous: true,
            child: Widget.Box({
                vertical: true,
                vpack: "center",
                children: [
                    appIcon,
                    // TODO: Add xwayland tag instead of just having italics
                    Widget.Revealer({
                        transition: "slide_right",
                        revealChild: revealInfoCondition,
                        child: Widget.Revealer({
                            transition: "slide_down",
                            revealChild: revealInfoCondition,
                            child: Widget.Label({
                                maxWidthChars: 1, // Doesn't matter what number
                                truncate: "end",
                                className: `margin-top-5 ${xwayland ? "txt txt-italic" : "txt"}`,
                                css: `
                                font-size: ${(Math.min(monitors[monitor].width, monitors[monitor].height) * userConfigs.overview.scale) / 14.6}px;
                                margin: 0px ${(Math.min(monitors[monitor].width, monitors[monitor].height) * userConfigs.overview.scale) / 10}px;
                            `,
                                // If the title is too short, include the class
                                label: title.length <= 1 ? `${c}: ${title}` : title,
                            }),
                        }),
                    }),
                ],
            }),
        }),
        tooltipText: `${c}: ${title}`,
        setup: (button) => {
            // setupCursorHoverGrab(button)

            button.drag_source_set(Gdk.ModifierType.BUTTON1_MASK, TARGET, Gdk.DragAction.MOVE)
            button.drag_source_set_icon_name(substitute(c))

            button.connect("drag-begin", (button) => {
                // On drag start, add the dragging class
                button.toggleClassName("overview-tasks-window-dragging", true)
            })
            button.connect("drag-data-get", (_w, _c, data) => {
                // On drag finish, give address
                data.set_text(address, address.length)
                button.toggleClassName("overview-tasks-window-dragging", false)
            })
        },
    })
}
