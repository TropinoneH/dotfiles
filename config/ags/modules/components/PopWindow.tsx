import { Binding } from "astal"
import { App, Astal, Gdk, Gtk } from "astal/gtk3"

export type PopWindowProps = {
    name: string
    child?: JSX.Element | JSX.Element[]
    exclusivity?: Astal.Exclusivity
    transition?: Gtk.RevealerTransitionType | Binding<Gtk.RevealerTransitionType>
    transitionDuration?: number
}

export default ({
    name,
    child,
    exclusivity = Astal.Exclusivity.NORMAL,
    transition = Gtk.RevealerTransitionType.CROSSFADE,
    transitionDuration = 300
}: PopWindowProps): JSX.Element => (
    <window
        name={name}
        namespace={name}
        application={App}
        exclusivity={exclusivity}
        layer={Astal.Layer.TOP}
        keymode={Astal.Keymode.ON_DEMAND}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
        onKeyPressEvent={(_self, event) => {
            if (event.get_keyval()[1] === Gdk.KEY_Escape) App.get_window(name)?.set_visible(false)
        }}
        css="background: transparent;"
    >
        <eventbox
            onButtonPressEvent={(_, event) => {
                const buttonClicked = event.get_button()[1]
                if (buttonClicked) App.get_window(name)?.set_visible(false)
            }}
        >
            <revealer
                revealChild={false}
                transitionType={transition}
                transitionDuration={transitionDuration}
                setup={(self) => {
                    App.connect("window-toggled", (_src, window) => {
                        if (window.name === name) self.set_reveal_child(window.visible)
                    })
                }}
            >
                <eventbox
                    onButtonPressEvent={(_, event) => {
                        const buttonClicked = event.get_button()[1]
                        if (buttonClicked === Gdk.BUTTON_PRIMARY || buttonClicked === Gdk.BUTTON_SECONDARY) return true
                    }}
                >
                    <box halign={Gtk.Align.CENTER} valign={Gtk.Align.START} expand canFocus>
                        {child}
                    </box>
                </eventbox>
            </revealer>
        </eventbox>
    </window>
)
