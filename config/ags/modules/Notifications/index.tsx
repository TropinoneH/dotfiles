import { Astal, Gdk } from "astal/gtk3"
import hyprland from "gi://AstalHyprland"
import Notifd from "gi://AstalNotifd"
import Notification from "./Notifications"
import { type Subscribable } from "astal/binding"
import { bind, timeout } from "astal"
import { config } from "../../config"

const TIMEOUT_DELAY = config.notifications.timeout
const displayTotal = config.notifications.displayTotal

const Hyprland = hyprland.get_default()

class NotificationMap implements Subscribable {
    private var: Map<number, Notifd.Notification> = new Map()
    private subs: Set<(map: Map<number, Notifd.Notification>) => void> = new Set()

    private notifiy() {
        for (const sub of this.subs) sub(this.var)
    }

    constructor() {
        const notifd = Notifd.get_default()

        notifd.connect("notified", (_, id) => this.set(id, notifd.get_notification(id)!))
        notifd.connect("resolved", (_, id) => this.delete(id))
    }

    private set(key: number, value: Notifd.Notification) {
        this.var.set(key, value)
        this.notifiy()
    }

    private delete(key: number) {
        this.var.delete(key)
        this.notifiy()
    }

    get() {
        return this.var
    }

    // needed by the Subscribable interface
    subscribe(callback: (map: Map<number, Notifd.Notification>) => void) {
        this.subs.add(callback)
        return () => this.subs.delete(callback)
    }
}

export default function NotificationPopups(gdkmonitor: Gdk.Monitor) {
    const { TOP, RIGHT } = Astal.WindowAnchor
    const notifs = new NotificationMap()

    return (
        <window
            css="all: unset;"
            gdkmonitor={bind(Hyprland, "focusedMonitor").as((m) => Gdk.Display.get_default()?.get_monitor(m.id) ?? gdkmonitor)}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | RIGHT}
        >
            <box vertical>
                {bind(notifs).as((notify) =>
                    [...notify.values()]
                        .reverse()
                        .slice(0, displayTotal)
                        .map((n) => (
                            <Notification
                                notification={n}
                                setup={() => timeout(TIMEOUT_DELAY, () => notify.has(n.id) && n.dismiss())}
                                onHoverLost={() => n.dismiss()}
                            />
                        ))
                )}
            </box>
        </window>
    )
}
