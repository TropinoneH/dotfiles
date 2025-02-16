import { Gdk } from "astal/gtk3"
import { bind } from "astal"
import hyprland from "gi://AstalHyprland"
import { getMonitor } from "./index"
import { config } from "../../config"
import { PointerButton } from "../components/Button"
const Hyprland = hyprland.get_default()

export default ({ monitor }: { monitor: Gdk.Monitor }) => {
    const monitorID = getMonitor(monitor).id

    const theme = config.theme.bar.workspace

    return (
        <box
            css={`
                color: ${theme.color};
                background: ${theme.bg};
                margin-right: 0.3rem;
                border-radius: 0.5rem;
            `}
        >
            <eventbox onScroll={config.bar.workspace.onScroll}>
                <box>
                    {bind(Hyprland, "workspaces").as((workspaces) =>
                        workspaces
                            .filter((w) => w.monitor?.id === monitorID)
                            .filter((w) => !w.name.startsWith("special"))
                            .sort((w1, w2) => w1.id - w2.id)
                            .map((w) => (
                                <PointerButton
                                    css={bind(Hyprland, "focusedWorkspace").as(
                                        (focused) => `
                                        color: ${focused === w ? theme.active : theme.color};
                                        background: transparent;
                                        border-radius: 0.5rem;
                                        `
                                    )}
                                    tooltipText={w.name}
                                    onClicked={() => w.focus()}
                                >
                                    <label css="font-size: 1.5rem; margin: -0.5rem;" label={w.id < 10 ? config.bar.workspace.icons[w.id - 1] : w.id.toString()} />
                                </PointerButton>
                            ))
                    )}
                </box>
            </eventbox>
        </box>
    )
}
