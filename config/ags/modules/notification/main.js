import { filterNotifications, notifyHasImg } from "./utils.js"
import Action from "./components/Action.js"
import Body from "./components/Body.js"
import CloseButton from "./components/CloseButton.js"
import Header from "./components/Header.js"
import Image from "./components/Image.js"

const Hyprland = await Service.import("hyprland")
const Notifications = await Service.import("notifications")

Notifications.popupTimeout = userConfigs.notifications.timeout
Notifications.cacheActions = userConfigs.notifications.doCache

const ignore = Variable([""])

export default () =>
    Widget.Window({
        name: "notifications",
        className: "notifications-window",
        monitor: Hyprland.active.monitor.bind("id"),
        layer: "overlay",
        anchor: ["top", "right"],
        exclusivity: "normal",
        visible: Notifications.bind("popups").as((popups) => popups.length > 0),
        child: Widget.Box({
            className: "notifications-box",
            vertical: true,
            hexpand: true,
            setup: (self) => {
                Utils.merge([Notifications.bind("popups"), ignore.bind("value")], (popups, ignore) => {
                    const filteredNotifications = filterNotifications(popups, ignore)
                    const displayTotal = userConfigs.notifications.displayTotal
                    self.children = filteredNotifications.slice(0, displayTotal).map((notify) =>
                        Widget.Box({
                            class_name: `notification-card ${notify.urgency}`,
                            vpack: "start",
                            hexpand: true,
                            children: [
                                Image(notify),
                                Widget.Box({
                                    vpack: "start",
                                    vertical: true,
                                    hexpand: true,
                                    class_name: `notification-card-content ${!notifyHasImg(notify) ? "no-img" : ""}`,
                                    children: [Header(notify), Body(notify), Action(notify, Notifications)],
                                }),
                                CloseButton(notify, Notifications),
                            ],
                        }),
                    )
                })
            },
        }),
    })
