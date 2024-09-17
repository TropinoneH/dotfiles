const { Gtk, Gdk } = imports.gi

export default ({ child, ...props }) =>
    Widget.EventBox({
        setup: (self) => {
            self.connect("enter-notify-event", (self, event) => {
                self.set_state_flags(Gtk.StateFlags.PRELIGHT, false)

                const display = Gdk.Display.get_default()

                if (!display) return

                self.window.set_cursor(Gdk.Cursor.new_from_name(display, "pointer"))

                return self.on_hover?.(self, event)
            })

            self.connect("leave-notify-event", (self, event) => {
                self.unset_state_flags(Gtk.StateFlags.PRELIGHT)

                self.window.set_cursor(null)

                return self.on_hover_lost?.(self, event)
            })

            self.add(child)
        },
        ...props,
    })
