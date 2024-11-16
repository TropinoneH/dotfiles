import { EventBox, EventBoxProps, Button, ButtonProps } from "astal/gtk3/widget"
import { Gtk, Gdk } from "astal/gtk3"

export const DimButton = ({ child, ...props }: EventBoxProps) => {
    const setup = (box: EventBox) => {
        box.connect("enter-notify-event", (self, event) => {
            self.set_state_flags(Gtk.StateFlags.PRELIGHT, false)
            const display = Gdk.Display.get_default()
            if (!display) return
            self.window.set_cursor(Gdk.Cursor.new_from_name(display, "pointer"))
        })
        box.connect("leave-notify-event", (self, event) => {
            self.unset_state_flags(Gtk.StateFlags.PRELIGHT)
            self.window.set_cursor(null)
        })
    }

    return (
        <eventbox setup={setup} {...props}>
            {child}
        </eventbox>
    )
}

export const PointerButton = ({ child, ...props }: ButtonProps) => {
    const setup = (button: Button) => {
        button.connect("enter-notify-event", (self, event) => {
            const display = Gdk.Display.get_default()
            if (!display) return
            self.window.set_cursor(Gdk.Cursor.new_from_name(display, "pointer"))
        })
        button.connect("leave-notify-event", (self, event) => {
            self.window.set_cursor(null)
        })
    }
    return (
        <button setup={setup} {...props}>
            {child}
        </button>
    )
}
