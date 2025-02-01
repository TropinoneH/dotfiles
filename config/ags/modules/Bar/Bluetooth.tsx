import bluetooth from "gi://AstalBluetooth"
import { DimButton } from "../components/Button"
import { Label } from "astal/gtk3/widget"
import { config } from "../../config"
const Bluetooth = bluetooth.get_default()

const getConnectedDevices = () => {
    const devices = Bluetooth.get_devices().filter(d => d.connected).length
    return devices > 0 ? ` ${devices}` : ""
}

export default () => {
    const theme = config.theme.bar.bluetooth

    const setup = (label: Label) => {
        label.hook(Bluetooth, "notify", (_) => label.label = getConnectedDevices())
    }

    return <DimButton onClick={config.bar.bluetooth.onClick}>
        <box css={`background: ${theme.bg}; padding: 0 0.5rem; margin-left: 0.3rem; border-radius: 0.5rem;`}>
            <label label={""} css={`color: ${theme.iconColor}`} />
            <label setup={setup} label={getConnectedDevices()} css={`color: ${theme.color}`} />
        </box>
    </DimButton>
}
