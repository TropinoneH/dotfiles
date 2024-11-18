import { notifyHasImg } from "../utils.js"

/**
 *@param {import("types/service/notifications").Notification} notify
 *@returns {import("types/@girs/gtk-3.0/gtk-3.0").Gtk.Widget}
 */
export default (notify) =>
    notifyHasImg(notify)
        ? Widget.Box({
              class_name: "notification-card-image-container",
              hpack: "center",
              vpack: "center",
              vexpand: false,
              child: Widget.Box({
                  hpack: "center",
                  vexpand: false,
                  class_name: "notification-card-image",
                  css: `background-image: url("${notify.image}")`,
              }),
          })
        : Widget.Box()
