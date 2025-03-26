import { Gtk } from "astal/gtk3"
import PopWindow from "../../components/PopWindow"
import VolumeSlider from "./VolumeSlider"
import { config } from "../../../config"
import AvailableDevices from "./AvailableDevices"

const theme = config.theme.dropMenu

export default () => (
    <PopWindow name="audio-menu">
        <box
            halign={Gtk.Align.FILL}
            valign={Gtk.Align.FILL}
            vertical
            expand
            css={`
                min-width: 22rem;
                background-color: ${theme.bg};
                color: ${theme.fg};
                padding: 0.5rem;
                border-radius: 0.5rem;
            `}
            className={"audio-menu"}
        >
            <VolumeSlider />
            <AvailableDevices />
        </box>
    </PopWindow>
)
