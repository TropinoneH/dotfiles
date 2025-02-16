import Wp from "gi://AstalWp"
import { config } from "../../config"
import { DimButton } from "../components/Button"
import { bind } from "astal"

const IconMap = (iconName: string) => {
    const iconSet = config.bar.audio.speaker.icons as [string[], string][]
    let ret = " "
    for (const iconIdx in iconSet) {
        const [names, icon] = iconSet[iconIdx]
        let contain = false
        for (const name of names) {
            if (iconName.includes(name)) {
                ret = icon
                contain = true
                break
            }
        }
        if (contain) break
    }
    return ret
}

export default () => {
    const theme = config.theme.bar.audio
    const speaker = Wp.get_default()?.audio.defaultSpeaker!
    return (
        <box
            css={`
                background: ${theme.bg};
                color: ${theme.color};
                padding: 0 0.5rem;
                margin-left: 0.3rem;
                border-radius: 0.5rem;
            `}
        >
            <DimButton onClick={config.bar.audio.onClick}>
                {bind(speaker, "mute").as((m) =>
                    m ? (
                        <label css={"color: " + theme.iconColor + ";"} label=" mute" />
                    ) : (
                        <eventbox onScroll={config.bar.audio.speaker.onScroll}>
                            <box>
                                <label css={"color: " + theme.iconColor + ";"} label={bind(speaker, "icon").as((i) => IconMap(i))} />
                                <label css={"color: " + theme.color + ";"} label={bind(speaker, "volume").as((v) => Math.floor(v * 100).toString())} />
                            </box>
                        </eventbox>
                    )
                )}
            </DimButton>
        </box>
    )
}
