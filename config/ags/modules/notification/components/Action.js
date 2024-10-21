/**
 *@param {import("types/service/notifications").Notification} notify
 *@param {import("types/service/notifications").Notifications} Notifications
 *@returns {import("types/@girs/gtk-3.0/gtk-3.0").Gtk.Widget}
 */
export default (notify, Notifications) =>
    notify.actions !== undefined && notify.actions.length > 0
        ? Widget.Box({
              class_name: "notification-card-actions",
              hexpand: true,
              vpack: "end",
              children: notify.actions.map((action) =>
                  Widget.Button({
                      hexpand: true,
                      class_name: "notification-action-buttons",
                      on_primary_click: () => {
                          if (action.id.includes("scriptAction:-")) {
                              Utils.execAsync(`${action.id.replace("scriptAction:-", "")}`).catch((err) =>
                                  console.error(err),
                              )
                              Notifications.CloseNotification(notify.id)
                          } else {
                              notify.invoke(action.id)
                          }
                      },
                      child: Widget.Box({
                          hpack: "center",
                          hexpand: true,
                          children: [
                              Widget.Label({
                                  class_name: "notification-action-buttons-label",
                                  hexpand: true,
                                  label: action.label,
                                  max_width_chars: 15,
                                  truncate: "end",
                                  wrap: true,
                              }),
                          ],
                      }),
                  }),
              ),
          })
        : Widget.Box()
