import AstalWp from "gi://AstalWp"
import { config } from "../../../config"
import { bind, Variable } from "astal"
import { getIcon, speakerIcons } from "./VolumeSlider"
import { Gtk } from "astal/gtk3"
import AudioSlider from "./AudioSlider"

const audioDevices = AstalWp.get_default()!.audio

const theme = config.theme.dropMenu

const SliderWrapper = ({ stream }: { stream: AstalWp.Endpoint }) => {
    const icon = Variable.derive([bind(stream, "volume"), bind(stream, "mute")], (vol, mute) => getIcon(vol, mute, speakerIcons))
    return <AudioSlider css="margin-top: 0.5rem;" device={stream} iconBinding={bind(icon)} onDestroy={() => icon.drop()} />
}

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
                <label css="opacity: 0.5; min-height: 7rem;" valign={Gtk.Align.CENTER} label={"No active playbacks found."} expand />
            ) : streams.length <= 2 ? (
                <box vertical css="background: transparent; min-height: 7rem;">
                    {streams.map((s) => s && <SliderWrapper stream={s} />)}
                </box>
            ) : (
                <scrollable css="background: transparent; min-height: 7rem;">
                    <box vertical>{streams.map((s) => s && <SliderWrapper stream={s} />)}</box>
                </scrollable>
            )
        )}
    </box>
)
