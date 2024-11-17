import bluetooth from "gi://AstalBluetooth"
import { DimButton } from "../components/Button"
import { bind } from "astal"
import { config } from "../../config"
const Bluetooth = bluetooth.get_default()

export default () => {
    const theme = config.theme.bar.bluetooth
    return <DimButton onClick={config.bar.bluetooth.onClick}>
        <box css={`background: ${theme.bg}; padding: 0 0.5rem; margin-left: 0.3rem; border-radius: 0.5rem;`}>
            <label label={""} css={`color: ${theme.iconColor}`} />
            <label label={bind(Bluetooth, "devices").as(devices => devices.filter(d => d.connected).length === 0 ? "" : " " + devices.length.toString())} css={`color: ${theme.color}`} />
        </box>
    </DimButton>
}
