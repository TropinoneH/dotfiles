import { bind } from "astal"
import { Gtk } from "astal/gtk3"
import AstalWp from "gi://AstalWp"

const Wireplumber = AstalWp.get_default() as AstalWp.Wp
const audioDevice = Wireplumber.audio

const Header = ({ label }: { label: string }) => (
    <box halign={Gtk.Align.FILL}>
        <label label={label} hexpand halign={Gtk.Align.START} />
    </box>
)

const AudioDevice = ({ device, icon }: { device: AstalWp.Endpoint; icon: string }) => (
    <button onClick={(_, event) => event.button === 1 && device.set_is_default(true)}>
        <box halign={Gtk.Align.START}>
            <label label={icon} />
            <label truncate wrap label={device.description} />
        </box>
    </button>
)

const NoFoundButton = () => (
    <button sensitive={false}>
        <label label={`No devices found...`} />
    </button>
)

const PlaybackDevices = () => (
    <box className={"menu-items-section playback"} vertical>
        <box className={"menu-container playback"} vertical>
            {bind(audioDevice, "speakers").as((devices) =>
                !devices || devices.length === 0 ? <NoFoundButton /> : devices.map((device) => <AudioDevice device={device} icon={""} />)
            )}
        </box>
    </box>
)
const InputDevices = () => (
    <box className={"menu-items-section playback"} vertical>
        <box className={"menu-container playback"} vertical>
            {bind(audioDevice, "microphones").as((devices) =>
                !devices || devices.length === 0 ? <NoFoundButton /> : devices.map((device) => <AudioDevice device={device} icon={""} />)
            )}
        </box>
    </box>
)

export default () => (
    <box vertical>
        <Header label="Playback Devices" />
        <PlaybackDevices />

        <Header label="Input Devices" />
        <InputDevices />
    </box>
)
