import { Gtk } from "astal/gtk3"
import PopWindow from "../components/PopWindow"
import Brightness from "../../libs/Brightness"
import { config } from "../../config"
import { bind } from "astal"

const theme = config.theme.dropMenu

const brightness = Brightness.get_default()

export default () => (
    <PopWindow name="backlight-menu" transition={Gtk.RevealerTransitionType.SLIDE_DOWN}>
        <box
            halign={Gtk.Align.FILL}
            hexpand
            vertical
            css={`
                padding: 0.5rem;
                border-radius: 0.5rem;
                background-color: ${theme.bg};
                color: ${theme.fg};
                min-width: 20rem;
            `}
            className="backlight-menu"
        >
            <label halign={Gtk.Align.START} hexpand label="Brightness" css="font-size: 1.5rem; margin-bottom: 0.6rem;" />
            <box valign={Gtk.Align.CENTER} halign={Gtk.Align.FILL} vexpand css="margin-bottom: 0.3rem;">
                <icon
                    valign={Gtk.Align.CENTER}
                    icon="display-brightness-symbolic"
                    vexpand
                    css={`
                        color: ${theme.active};
                        font-size: 1.4rem;
                    `}
                />
                <slider
                    className="menu-slider"
                    value={bind(brightness, "screen")}
                    onDragged={({ value, dragging }) => {
                        if (dragging) brightness.screen = value
                    }}
                    valign={Gtk.Align.CENTER}
                    drawValue={false}
                    expand
                    min={0}
                    max={1}
                />
                <label
                    label={bind(brightness, "screen").as((screenBrightness) => `${Math.round(screenBrightness * 100)}%`)}
                    valign={Gtk.Align.CENTER}
                    vexpand
                    css="font-weight: bold; min-width: 2rem; margin-left: 0.7rem;"
                />
            </box>
        </box>
    </PopWindow>
)
