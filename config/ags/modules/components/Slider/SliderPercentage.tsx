import { bind } from "astal"
import { Gtk } from "astal/gtk3"
import AstalWp from "gi://AstalWp"

export const SliderPercentage = ({ device }: { device: AstalWp.Endpoint }): JSX.Element => (
    <label css="font-weight: bold; min-width: 2rem; margin-left: 0.7rem;" valign={Gtk.Align.END} label={bind(device, "volume").as((vol) => `${Math.round(vol * 100)}%`)} />
)
