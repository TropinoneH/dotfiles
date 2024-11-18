/**
 *@param {import("types/service/notifications").Notification[]} notifications
 *@param {String[]} filter
 *@returns {import("types/service/notifications").Notification[]}
 */
export const filterNotifications = (notifications, filter) => {
    const notifyFilter = new Set(filter.map((name) => name.toLowerCase().replace(/\s+/g, "_")))

    const filteredNotifications = notifications.filter((notify) => {
        const normalizedAppName = notify.app_name.toLowerCase().replace(/\s+/g, "_")
        return !notifyFilter.has(normalizedAppName)
    })

    return filteredNotifications
}

/**
 *@param {import("types/service/notifications").Notification} notify
 *@returns {Boolean}
 */
export const notifyHasImg = (notify) => {
    return notify.image !== undefined && notify.image.length ? true : false
}

/**
 *@param {String} app_name
 *@param {String} app_icon
 *@param {String} app_entry
 *@returns {String}
 */
export const getNotificationIcon = (app_name, app_icon, app_entry) => {
    let icon = "dialog-information-symbolic"

    if (Utils.lookUpIcon(app_name) || Utils.lookUpIcon(app_name.toLowerCase() || "")) {
        icon = Utils.lookUpIcon(app_name)
            ? app_name
            : Utils.lookUpIcon(app_name.toLowerCase())
              ? app_name.toLowerCase()
              : ""
    }

    if (Utils.lookUpIcon(app_icon) && icon === "") {
        icon = app_icon
    }

    if (Utils.lookUpIcon(app_entry || "") && icon === "") {
        icon = app_entry || ""
    }

    return icon
}
