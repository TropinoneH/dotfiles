import { Gdk } from "astal/gtk3"
import { bind } from "astal"
import hyprland from "gi://AstalHyprland"
import { getMonitor } from "../../libs/monitor"
import { config } from "../../config"
import { PointerButton } from "../components/Button"
const Hyprland = hyprland.get_default()

export default ({ monitor }: { monitor: Gdk.Monitor }) => {
    const monitorID = getMonitor(monitor)?.id ?? 0
    Hyprland.get_workspaces()
        .filter((w) => w.monitor.id == monitorID)
        .sort((w1, w2) => (w1.name > w2.name ? 1 : -1))
        .map((w) => {
            console.log(`name: ${w.name}, monitor: ${w.monitor}, id: ${w.id}, last client: ${w.lastClient}, full screen: ${w.hasFullscreen}`)
        })

    console.log("--------------------------")

    const theme = config.theme.bar.workspace

    return (
        <box css={`color: ${theme.color}; background: ${theme.bg}; margin: 0 0.3rem; border-radius: 0.5rem;`}>
            <eventbox onScroll={config.bar.workspace.onScroll}>
                <box>
                    {bind(Hyprland, "workspaces").as((workspaces) =>
                        workspaces
                            .filter((w) => w.monitor?.id === monitorID)
                            .sort((w1, w2) => (w1.id - w2.id))
                            .map((w) => (
                                <PointerButton
                                    css={bind(Hyprland, "focusedWorkspace").as(
                                        (focused) => `
                                        color: ${focused == w ? theme.active : theme.color};
                                        background: transparent;
                                        border-radius: 0.5rem;
                                        `
                                    )}
                                    tooltipText={w.name}
                                    onClicked={() => w.focus()}
                                >
                                    <label label={w.id < 10 ? config.bar.workspace.icons[w.id - 1] : w.id.toString()} />
                                </PointerButton>
                            ))
                    )}
                </box>
            </eventbox>
        </box>
    )
}
