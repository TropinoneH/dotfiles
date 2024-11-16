import hyprland from "gi://AstalHyprland"
import { bind } from "astal"
import { config } from "../../config"
const Hyprland = hyprland.get_default()

export default () => {
    const theme = config.theme.bar.title
    return (
        <box css={`color: ${theme.color}; background: ${theme.bg}; padding: 0 0.5rem; margin-right: 0.3rem; border-radius: 0.5rem;`} tooltipText={bind(Hyprland, "focusedClient").as((client) => `${client.initialClass} | ${client.title} | ${client.pid}`)}>
            <label label={bind(Hyprland, "focusedClient").as((client) => client.initialClass)} />
        </box>
    )
}
