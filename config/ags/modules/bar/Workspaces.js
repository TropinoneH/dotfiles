import CursorClickWidget from "../commonWidget/CursorClickWidget.js"

const Hyprland = await Service.import("hyprland")

/**
 *@param {number} curMonitor
 */
export default (curMonitor) =>
    Widget.Box({
        className: "workspaces-box",
        children: Hyprland.bind("workspaces").as((ws) =>
            ws
                .filter((ws) => ws.monitorID == curMonitor)
                .sort((a, b) => a.id - b.id) // asensding order
                .map((ws) =>
                    CursorClickWidget({
                        child: Widget.Button({
                            className: "workspace-btn",
                            child: Widget.Label({
                                className: "workspace-label",
                                label: ws.id <= 10 ? userConfigs.bar.icons.workspaces[ws.id - 1] : ws.id.toString(),
                            }),
                            onClicked: () => {
                                Hyprland.message(`dispatch workspace ${ws.id}`)
                            },
                        }).hook(
                            Hyprland,
                            (self) => {
                                self.child.toggleClassName(
                                    "workspace-label-active",
                                    Hyprland.active.workspace.id === ws.id,
                                )
                            },
                            "notify::active",
                        ),
                        onScrollUp: () => Utils.exec(userConfigs.bar.scripts.workspaces.onScrollUp),
                        onScrollDown: () => Utils.exec(userConfigs.bar.scripts.workspaces.onScrollDown),
                    }),
                ),
        ),
    })
