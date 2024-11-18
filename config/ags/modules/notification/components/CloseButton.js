/**
 *@param {import("types/service/notifications").Notification} notify
 *@param {import("types/service/notifications").Notifications} Notifications
 *@returns {import("types/@girs/gtk-3.0/gtk-3.0").Gtk.Widget}
 */
export default (notify, Notifications) =>
    Widget.Button({
        class_name: "close-notification-button",
        on_primary_click: () => {
            Notifications.CloseNotification(notify.id)
        },
        child: Widget.Label({
            class_name: "txt-icon notif-close",
            label: "󰅜",
            hpack: "center",
        }),
    })
