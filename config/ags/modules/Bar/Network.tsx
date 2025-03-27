import network from "gi://AstalNetwork"
import { bind, Variable } from "astal"
import { EventBoxProps } from "astal/gtk3/widget"
import { DimButton } from "../components/Button"
import { config } from "../../config"
const Network = network.get_default()

const getPrimary = (primary: network.Primary) => ["unknown", "wired", "wifi"][primary]
const getInternet = (internet: network.Internet) => ["connected", "connecting", "disconnected"][internet]
// const connectionState = (state: network.State)
const getDeviceState = (state: network.DeviceState) =>
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
const Wired = (props: EventBoxProps) => {
    const tooltip = Variable.derive(
        [bind(Network.wired.device, "interface"), bind(Network.wired, "state"), bind(Network.wired, "internet"), bind(Network.wired, "speed")],
        (deviceInterface, state, internet, speed) => `${deviceInterface}: ${getDeviceState(state)} | ${getInternet(internet)} | ${speed} Mbps`
    )
    return (
        <DimButton {...props} tooltipText={bind(tooltip)} onDestroy={() => tooltip.drop()}>
            <label
                label=""
                css={`
                    color: ${config.theme.bar.network.iconColor};
                `}
            />
        </DimButton>
    )
}

const WIFI = (props: EventBoxProps) => {
    const tooltip = Variable.derive(
        [bind(Network.wifi, "ssid"), bind(Network.wifi, "internet"), bind(Network.wifi, "strength")],
        (ssid, internet, strength) => `${ssid}: ${getInternet(internet)} | ${strength}%`
    )
    return (
        <DimButton {...props} tooltipText={bind(tooltip)} onDestroy={() => tooltip.drop()}>
            <label
                label=""
                css={`
                    color: ${config.theme.bar.network.iconColor};
                `}
            />
        </DimButton>
    )
}

export default () => {
    const theme = config.theme.bar.network
    const onClick = config.bar.network.onClick
    return (
        <box css="margin-left: 0.3rem;">
            <stack
                shown={bind(Network, "primary").as((p) => getPrimary(p))}
                css={`
                    color: ${theme.color};
                    background: ${theme.bg};
                    padding: 0 0.5rem;
                    border-radius: 0.5rem;
                `}
            >
                <DimButton name="unknown" onClick={onClick}>
                    <label
                        label={"󰖪"}
                        css={`
                            color: ${theme.iconDisconnectColor};
                        `}
                    />
                </DimButton>
                <box name="wired">{bind(Network, "wired").as((w) => (w ? <Wired name="wired" onClick={onClick} /> : <></>))}</box>
                <WIFI name="wifi" onClick={onClick} />
            </stack>
        </box>
    )
}
