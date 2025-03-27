import { bind, Variable } from "astal"
import { Gtk } from "astal/gtk3"
import AstalWp from "gi://AstalWp"
import { config } from "../../../config"
import { PointerButton } from "../../components/Button"

const Wireplumber = AstalWp.get_default() as AstalWp.Wp
const audioDevice = Wireplumber.audio

const theme = config.theme.dropMenu

const Header = ({ label }: { label: string }) => (
    <box halign={Gtk.Align.FILL} css="margin-bottom: 0.5rem;">
        <label label={label} hexpand halign={Gtk.Align.START} />
    </box>
)

const AudioDevice = ({ device, icon }: { device: AstalWp.Endpoint; icon: string }) => {
    const tooltip = Variable.derive(
        [bind(device, "mute"), bind(device, "volume"), bind(device, "description")],
        (mute, vol, des) => `${des}: ${mute ? "mute" : Math.round(vol * 100) + "%"}`
    )
    return (
        <PointerButton onClick={(_, event) => event.button === 1 && device.set_is_default(true)} tooltipText={bind(tooltip)} onDestroy={() => tooltip.drop()}>
            <box halign={Gtk.Align.START}>
                <label label={icon} css="margin: 0 0.5rem;" />
                <label truncate wrap label={device.description} />
            </box>
        </PointerButton>
    )
}

const NoFoundButton = () => <label label={`No devices found...`} css="font-weight: bold; margin: 1.5rem 1rem;" />

const AudioDevices = ({ deviceType }: { deviceType: "speakers" | "microphones" }) => (
    <box className={"menu-items-section playback"} vertical>
        <box className={"menu-container playback"} vertical>
            {bind(audioDevice, deviceType).as((devices) =>
                !devices || devices.length === 0 ? (
                    <NoFoundButton />
                ) : (
                    devices.map((device) => <AudioDevice device={device} icon={deviceType === "microphones" ? "" : ""} />)
                )
            )}
        </box>
    </box>
)

export default () => (
    <box
        vertical
        css={`
            margin-top: 0.5rem;
            background-color: ${theme.overlay};
            padding: 0.5rem;
            border-radius: 0.5rem;
        `}
    >
        <Header label="Playback Devices" />
        <AudioDevices deviceType="speakers" />

        <Header label="Input Devices" />
        <AudioDevices deviceType="microphones" />
    </box>
)
