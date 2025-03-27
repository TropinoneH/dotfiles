import { bind, Variable } from "astal"
import { Astal, Gtk } from "astal/gtk3"
import AstalWp from "gi://AstalWp"
import { config } from "../../../config"
import AudioStreams from "./AudioStreams"
import AudioSlider from "./AudioSlider"

const Wireplumber = AstalWp.get_default() as AstalWp.Wp
const audioDevices = Wireplumber.audio

const activeMenu: Variable<"devices" | "playbacks"> = Variable("devices")

export const speakerIcons = {
    101: "audio-volume-overamplified-symbolic",
    66: "audio-volume-high-symbolic",
    34: "audio-volume-medium-symbolic",
    1: "audio-volume-low-symbolic",
    0: "audio-volume-muted-symbolic"
}

const inputIcons = {
    101: "microphone-sensitivity-high-symbolic",
    66: "microphone-sensitivity-high-symbolic",
    34: "microphone-sensitivity-medium-symbolic",
    1: "microphone-sensitivity-low-symbolic",
    0: "microphone-disabled-symbolic"
}

export const getIcon = (audioVol: number, isMuted: boolean, iconSet: Record<number, string>): string =>
    iconSet[isMuted ? 0 : [101, 66, 34, 1, 0].find((threshold) => threshold <= audioVol * 100) || 0]

const theme = config.theme.dropMenu

const DefaultSlider = ({ device, iconSet, raise = false }: { raise?: boolean; device: AstalWp.Endpoint; iconSet: Record<number, string> }) => {
    const icon = Variable.derive([bind(device, "volume"), bind(device, "mute")], (vol, mute) => getIcon(vol, mute, iconSet))
    return <AudioSlider raise={raise} device={device} iconBinding={bind(icon)} onDestroy={() => icon.drop()} />
}

export default () => (
    <box
        vertical
        css={`
            background-color: ${theme.overlay};
            padding: 0.5rem;
            border-radius: 0.5rem;
        `}
    >
        <box halign={Gtk.Align.FILL} css="margin-bottom: 0.5rem;">
            <label css="font-size: 1.5rem" label="Volume" halign={Gtk.Align.START} hexpand />
            <button
                onClick={(_, e) => {
                    if (e.button === Astal.MouseButton.PRIMARY) activeMenu.set(activeMenu.get() === "devices" ? "playbacks" : "devices")
                }}
                halign={Gtk.Align.END}
                hexpand
                css={`
                    padding: 0 1rem;
                    background-color: transparent;
                    color: ${theme.fg};
                `}
                onHover={(self, _e) => {
                    self.set_css(`padding: 0 1rem; background-color: transparent; color: ${theme.active};`)
                }}
                onHoverLost={(self, _e) => {
                    self.set_css(`padding: 0 1rem; background-color: transparent; color: ${theme.fg}`)
                }}
            >
                <label label={bind(activeMenu).as((menu) => (menu === "devices" ? "" : "󰤽"))} css="font-size: 1.6rem;" />
            </button>
        </box>
        <revealer transitionType={Gtk.RevealerTransitionType.NONE} revealChild={bind(activeMenu).as((menu) => menu === "devices")}>
            <box
                vertical
                css={`
                    background-color: ${theme.bg};
                    border-radius: 0.65rem;
                    padding: 1rem 0.3rem 0.4rem 0.3rem;
                `}
            >
                <DefaultSlider raise device={audioDevices.defaultSpeaker} iconSet={speakerIcons} />
                <DefaultSlider device={audioDevices.defaultMicrophone} iconSet={inputIcons} />
            </box>
        </revealer>
        <revealer transitionType={Gtk.RevealerTransitionType.NONE} revealChild={bind(activeMenu).as((menu) => menu === "playbacks")}>
            <AudioStreams />
        </revealer>
    </box>
)
