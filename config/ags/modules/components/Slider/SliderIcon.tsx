import { bind, Binding, Variable } from "astal"
import { Gdk, Gtk } from "astal/gtk3"
import AstalWp from "gi://AstalWp"
import { config } from "../../../config"


export const SliderIcon = ({ device, iconBinding }: { device: AstalWp.Endpoint; iconBinding: Variable<string> | Binding<string> }): JSX.Element => {
    const cssColor: Variable<string> = Variable(config.theme.dropMenu.fg)
    return (
        <button
            vexpand={false}
            valign={Gtk.Align.END}
            onClick={(_, e) => {
                if (e.button === Gdk.BUTTON_PRIMARY) device.mute = !device.mute
            }}
            css={bind(cssColor).as(css => `color: ${css}`)}
            onHover={() => cssColor.set(config.theme.dropMenu.active)}
            onHoverLost={() => cssColor.set(config.theme.dropMenu.fg)}
        >
            <icon className={`menu-active-icon`} icon={bind(iconBinding)} />
        </button>
    )
}
