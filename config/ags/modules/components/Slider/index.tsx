import { bind, Binding, exec, Variable } from "astal"
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
                    self.connect("scroll-event", (_, e: Gdk.Event) => {
                        exec(`pactl set-sink-volume @DEFAULT_SINK@ ${e.get_scroll_direction()[1] === Gdk.ScrollDirection.DOWN ? "-1%" : "+1%"}`)
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
    css = ""
}: {
    device: AstalWp.Endpoint
    iconBinding: Variable<string> | Binding<string>
    raise?: boolean
    css?: string
}) => (
    <box
        css={`
            margin-bottom: 0.7rem;
            ${css}
        `}
    >
        <SliderIcon iconBinding={iconBinding} device={device} />
        <Slider device={device} raise={raise} />
        <SliderPercentage device={device} />
    </box>
)
