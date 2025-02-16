import network from "gi://AstalNetwork"
import { bind } from "astal"
import { EventBoxProps } from "astal/gtk3/widget"
import { DimButton } from "../components/Button"
import { config } from "../../config"
const Network = network.get_default()

const primary = (primary: network.Primary) => ["unknown", "wired", "wifi"][primary]
const internet = (internet: network.Internet) => ["connected", "connecting", "disconnected"][internet]
// const connectionState = (state: network.State)
const deviceState = (state: network.DeviceState) =>
    [
        "unknown",
        "unmanaged",
        "unavailable",
        "disconnected",
        "prepare",
        "config",
        "need_auth",
        "ip_config",
        "ip_check",
        "secondaries",
        "activated",
        "deactivating",
        "failed"
    ][Math.floor(state / 10)]

// Network.wired.get_device().get_type_description() => earthnet
const Wired = (props: EventBoxProps) => (
    <DimButton
        {...props}
        tooltipText={bind(Network, "wired").as((w) => `${w.device.interface}: ${deviceState(w.state)} | ${internet(w.internet)} | ${w.speed} Mbps`)}
    >
        <label label="" css={`color: ${config.theme.bar.network.iconColor};`} />
    </DimButton>
)

const WIFI = (props: EventBoxProps) => (
    <DimButton {...props} tooltipText={bind(Network, "wifi").as((w) => `${w.ssid}: ${internet(w.internet)} | ${w.strength}%`)}>
        <label label="" css={`color: ${config.theme.bar.network.iconColor};`} />
    </DimButton>
)

export default () => {
    const theme = config.theme.bar.network
    const onClick = config.bar.network.onClick
    return (
        <box css="margin-left: 0.3rem;">
            <stack
                shown={bind(Network, "primary").as((p) => primary(p))}
                css={`
                    color: ${theme.color};
                    background: ${theme.bg};
                    padding: 0 0.5rem;
                    border-radius: 0.5rem;
                `}
            >
                <DimButton name="unknown" onClick={onClick}>
                    <label label={"󰖪"} css={`color: ${theme.iconDisconnectColor};`} />
                </DimButton>
                <Wired name="wired" onClick={onClick} />
                <WIFI name="wifi" onClick={onClick} />
            </stack>
        </box>
    )
}
