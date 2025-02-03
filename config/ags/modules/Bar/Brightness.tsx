import { bind } from "astal"
import { config } from "../../config"
import Brightness from "../../libs/Brightness"
import { DimButton } from "../components/Button"

const getIcon = (precent: number) => {
    const light = precent * 100
    const icons = config.bar.brightness.icons
    return icons[Math.floor((light >= 100 ? 99 : light) / (100 / icons.length))]
}

export default () => {
    const brightness = Brightness.get_default()!
    const theme = config.theme.bar.brightness
    return (
        <DimButton onScroll={config.bar.brightness.onScroll} onClick={config.bar.brightness.onClick}>
            <box
                css={`
                    background: ${theme.bg};
                    color: ${theme.color};
                    padding: 0 0.5rem;
                    margin-left: 0.3rem;
                    border-radius: 0.5rem;
                `}
            >
                <label css={"color: " + theme.iconColor + ";"} label={bind(brightness, "screen").as((s) => getIcon(s))} />
                <label css={"color: " + theme.color + ";"} label={bind(brightness, "screen").as((s) => ` ${Math.round(s * 100)}`)} />
            </box>
        </DimButton>
    )
}
