import { bind, Binding, Variable } from "astal"
import { Gdk, Gtk } from "astal/gtk3"
import AstalWp from "gi://AstalWp"
import { SliderIcon } from "./SliderIcon"
import { SliderPercentage } from "./SliderPercentage"

const Slider = ({ device, raise }: { device: AstalWp.Endpoint; raise: boolean }): JSX.Element => {
    return (
        <box vertical>
            <label
                css="margin: 0 0.5rem;"
                halign={Gtk.Align.START}
                truncate
                hexpand
                wrap
                label={bind(device, "description").as((description) => description ?? `Unknown device: ${device.name}`)}
            />
            <slider
                className={`menu-slider`}
                value={bind(device, "volume")}
                drawValue={false}
                hexpand
                min={0}
                max={raise ? 1.5 : 1}
                onDragged={({ value, dragging }) => {
                    if (dragging) {
                        device.volume = value
                        device.mute = false
                    }
                }}
                setup={(self) => {
                    self.connect("scroll-event", (_, event: Gdk.Event) => {
                        const [dirOk, dir] = event.get_scroll_direction()
                        const [deltaOk, , yDelta] = event.get_scroll_deltas()
                        if ((dirOk && dir === Gdk.ScrollDirection.UP) || (deltaOk && yDelta < 0))
                            device.set_volume(Math.min(device.volume + 0.02, raise ? 1.5 : 1))
                        if ((dirOk && dir === Gdk.ScrollDirection.DOWN) || (deltaOk && yDelta > 0)) device.set_volume(device.volume - 0.02)
                    })
                }}
            />
        </box>
    )
}

export default ({
    device,
    iconBinding,
    raise = false,
    css = "",
    onDestroy = () => {}
}: {
    device: AstalWp.Endpoint
    iconBinding: Variable<string> | Binding<string>
    raise?: boolean
    css?: string
    onDestroy?: () => void
}) => (
    <box
        css={`
            margin-bottom: 0.7rem;
            ${css}
        `}
        onDestroy={onDestroy}
    >
        <SliderIcon iconBinding={iconBinding} device={device} />
        <Slider device={device} raise={raise} />
        <SliderPercentage device={device} />
    </box>
)
