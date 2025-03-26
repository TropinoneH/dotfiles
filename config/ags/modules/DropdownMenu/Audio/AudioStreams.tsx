import AstalWp from "gi://AstalWp"
import { config } from "../../../config"
import { bind, Variable } from "astal"
import Slider from "../../components/Slider"
import { getIcon, speakerIcons } from "./VolumeSlider"

const audioDevices = AstalWp.get_default()!.audio

const theme = config.theme.dropMenu

export default () => (
    <box
        css={`
            background-color: ${theme.bg};
            border-radius: 0.65rem;
            padding: 0.3rem;
        `}
        vertical
    >
        {bind(audioDevices, "streams").as((streams) =>
            !streams || streams.length === 0 ? (
                <label css="opacity: 0.5;" label={"No active playbacks found."} expand />
            ) : streams.length <= 3 ? (
                <box vertical css="background: transparent; min-height: 9rem;">
                    {streams.map((s) => (
                        <Slider
                            css="margin-top: 0.5rem;"
                            device={s}
                            iconBinding={Variable.derive([bind(s, "volume"), bind(s, "mute")], (vol, mute) => getIcon(vol, mute, speakerIcons))}
                        />
                    ))}
                </box>
            ) : (
                <scrollable css="background: transparent; min-height: 9rem;">
                    <box vertical>
                        {streams.map((s) => (
                            <Slider
                                css="margin-top: 0.5rem;"
                                device={s}
                                iconBinding={Variable.derive([bind(s, "volume"), bind(s, "mute")], (vol, mute) => getIcon(vol, mute, speakerIcons))}
                            />
                        ))}
                    </box>
                </scrollable>
            )
        )}
    </box>
)
