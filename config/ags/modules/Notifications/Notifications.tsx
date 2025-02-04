import { GLib } from "astal"
import { Gtk, Astal } from "astal/gtk3"
import { type EventBox } from "astal/gtk3/widget"
import Notifd from "gi://AstalNotifd"
import { config } from "../../config"

const isIcon = (icon: string) => !!Astal.Icon.lookup_icon(icon)

const fileExists = (path: string) => GLib.file_test(path, GLib.FileTest.EXISTS)

const time = (time: number, format = "%H:%M") => GLib.DateTime.new_from_unix_local(time).format(format)!

const Icon = ({ notification: n }: { notification: Notifd.Notification }) => {
    const theme = config.theme.notifications
    const { START, CENTER } = Gtk.Align
    return n.appIcon ? (
        fileExists(n.appIcon) ? (
            <box
                valign={CENTER}
                halign={START}
                css={`
                    min-width: 1rem;
                    min-height: 1rem;
                    background-size: cover;
                    background-position: center;
                    background-image: url("${n.appIcon}");
                    background-color: ${theme.border};
                `}
            />
        ) : isIcon(n.appIcon) ? (
            <box
                expand={false}
                valign={CENTER}
                halign={START}
                css={`
                    min-width: 1rem;
                    min-height: 1rem;
                    background-color: ${theme.border};
                `}
            >
                <icon icon={n.appIcon} expand halign={CENTER} valign={CENTER} />
            </box>
        ) : null
    ) : null
}

type NotificationWidgetProps = {
    setup?: (self: EventBox) => void
    onHoverLost?: (self: EventBox) => void
    notification: Notifd.Notification
    onHover?: (self: EventBox) => void
}

export default ({ notification: n, onHoverLost, setup, onHover }: NotificationWidgetProps) => {
    const { START, CENTER, END } = Gtk.Align
    const theme = config.theme.notifications

    const urgency = (notify: Notifd.Notification) => {
        const { LOW, CRITICAL, NORMAL } = Notifd.Urgency
        switch (notify.urgency) {
            case LOW:
                return theme.warning
            case CRITICAL:
                return theme.critical
            case NORMAL:
            default:
                return theme.info
        }
    }

    return (
        <eventbox setup={setup} onHoverLost={onHoverLost} onHover={onHover}>
            <box
                vertical
                css={`
                    margin-top: 1rem;
                    min-width: 20rem;
                    border-radius: 0 0 0.5rem 0.5rem;
                    background-color: ${theme.bg};
                `}
            >
                <box vertical>
                    <box css={"padding: 0.5rem; border-radius: 0.5rem 0.5rem 0 0; background-color: " + urgency(n) + ";"}>
                        <Icon notification={n} />
                        <label css="font-weight: bold; margin-left: 1rem;" halign={START} xalign={0} label={n.summary} truncate />
                        <label css="margin: 0 0.4rem;" hexpand halign={END} label={time(n.time)} />
                        <button onClicked={() => n.dismiss()} css="padding: 0.2rem 0.4rem; margin-left: 1rem;">
                            <icon icon="window-close-symbolic" />
                        </button>
                    </box>
                    <box css="margin: 0.5rem 1rem;">
                        {n.body && <label css={"color: " + theme.fg + ";"} wrap useMarkup halign={START} xalign={0} label={n.body} />}
                    </box>
                </box>
                {n.get_actions().length > 0 && (
                    <box css={"color: " + theme.fg + ";"}>
                        {n.get_actions().map(({ label, id }) => (
                            <button css={"margin: 0.5rem; background-color: " + theme.actionBg + ";"} hexpand onClicked={() => n.invoke(id)}>
                                <label label={label} halign={CENTER} hexpand />
                            </button>
                        ))}
                    </box>
                )}
            </box>
        </eventbox>
    )
}
