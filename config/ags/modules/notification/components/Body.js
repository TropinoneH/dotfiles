import { notifyHasImg } from "../utils.js"

/**
 *@param {import("types/service/notifications").Notification} notify
 *@returns {import("types/@girs/gtk-3.0/gtk-3.0").Gtk.Widget}
 */
export default (notify) =>
    Widget.Box({
        vpack: "start",
        hexpand: true,
        class_name: "notification-card-body",
        children: [
            Widget.Label({
                hexpand: true,
                use_markup: true,
                xalign: 0,
                justification: "left",
                truncate: "end",
                lines: 2,
                max_width_chars: !notifyHasImg(notify) ? 35 : 28,
                wrap: true,
                class_name: "notification-card-body-label",
                label: notify["body"],
            }),
        ],
    })
