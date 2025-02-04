import { Astal, Gdk } from "astal/gtk3"
import hyprland from "gi://AstalHyprland"
import Notifd from "gi://AstalNotifd"
import Notification from "./Notifications"
import { type Subscribable } from "astal/binding"
import { bind, timeout } from "astal"
import { config } from "../../config"

// see comment below in constructor
const TIMEOUT_DELAY = config.notifications.timeout
const displayTotal = config.notifications.displayTotal

const Hyprland = hyprland.get_default()

// The purpose if this class is to replace Variable<Array<Widget>>
// with a Map<number, Widget> type in order to track notification widgets
// by their id, while making it conviniently bindable as an array
class NotificationMap implements Subscribable {
    // the underlying map to keep track of id widget pairs
    private var: Map<number, Notifd.Notification> = new Map()
    private subs: Set<(map: Map<number, Notifd.Notification>) => void> = new Set()

    private notifiy() {
        for (const sub of this.subs) sub(this.var)
    }

    constructor() {
        const notifd = Notifd.get_default()

        notifd.connect("notified", (_, id) => {
            const keys = [...this.var.keys()]
            if (keys.length >= displayTotal) this.delete(keys.sort((a, b) => a - b)[0])
            this.set(id, notifd.get_notification(id)!)
        })

        notifd.connect("resolved", (_, id) => this.delete(id))
    }

    private set(key: number, value: Notifd.Notification) {
        // in case of replacecment destroy previous widget
        this.var.set(key, value)
        this.notifiy()
    }

    private delete(key: number) {
        this.var.delete(key)
        this.notifiy()
    }

    // needed by the Subscribable interface
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
                    [...notify.values()].reverse().map((n) => {
                        let timer: ReturnType<typeof timeout>
                        return (
                            <Notification
                                notification={n}
                                setup={() => {
                                    timer = timeout(TIMEOUT_DELAY, () => n.dismiss())
                                }}
                                onHoverLost={() => n.dismiss()}
                                onHover={() => timer.cancel()}
                            />
                        )
                    })
                )}
            </box>
        </window>
    )
}
