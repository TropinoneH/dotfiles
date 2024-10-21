const { GLib } = imports.gi

import { notifyHasImg, getNotificationIcon } from "../utils.js"

const NotificationIcon = ({ app_entry = "", app_icon = "", app_name = "" }) =>
    Widget.Box({
        css: `
            min-width: 2rem;
            min-height: 2rem;
        `,
        child: Widget.Icon({
            class_name: "notification-icon",
            icon: getNotificationIcon(app_name, app_icon, app_entry),
        }),
    })

/**
 *@param {import("types/service/notifications").Notification} notify
 *@returns {import("types/@girs/gtk-3.0/gtk-3.0").Gtk.Widget}
 */
export default (notify) =>
    Widget.Box({
        vertical: false,
        hexpand: true,
        children: [
            Widget.Box({
                class_name: "notification-card-header",
                hpack: "start",
                children: [NotificationIcon(notify)],
            }),
            Widget.Box({
                class_name: "notification-card-header",
                hexpand: true,
                hpack: "start",
                vpack: "start",
                children: [
                    Widget.Label({
                        class_name: "notification-card-header-label",
                        hpack: "start",
                        hexpand: true,
                        vexpand: true,
                        max_width_chars: !notifyHasImg(notify) ? 30 : 19,
                        truncate: "end",
                        wrap: true,
                        label: notify["summary"],
                    }),
                ],
            }),
            Widget.Box({
                class_name: "notification-card-header menu",
                hpack: "end",
                vpack: "start",
                hexpand: true,
                child: Widget.Label({
                    vexpand: true,
                    class_name: "notification-time",
                    label: GLib.DateTime.new_from_unix_local(notify.time).format("%H:%M") || "--",
                }),
            }),
        ],
    })
