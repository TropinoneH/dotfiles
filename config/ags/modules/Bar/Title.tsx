import hyprland from "gi://AstalHyprland"
import { bind, Variable } from "astal"
import { Gdk } from "astal/gtk3"
import { config } from "../../config"
import { getMonitor } from "./index"
const Hyprland = hyprland.get_default()

export default ({ monitor }: { monitor: Gdk.Monitor }) => {
    const activeClient = Variable<{ initialClass: string; title: string; pid: number } | null>(null)
    const activeChanged = bind(Hyprland, "focusedClient")

    const theme = config.theme.bar.title
    const monitorID = getMonitor(monitor).id

    return (
        <box
            css={`
                color: ${theme.color};
                background: ${theme.bg};
                padding: 0 0.5rem;
                margin-right: 0.3rem;
                border-radius: 0.5rem;
            `}
            tooltipText={activeClient((a) => (a ? `${a.initialClass} | ${a.title} | ${a.pid}` : ""))}
        >
            <label
                label={activeChanged.as((client) => {
                    if (!client || client.monitor?.id === monitorID) activeClient.set(client)
                    return activeClient?.get()?.initialClass ?? "Desktop"
                })}
                truncate
                maxWidthChars={10}
            />
        </box>
    )
}
