import CursorClickArea from "../commonWidget/CursorClickWidget.js"
import openWindow from "../commonWidget/openWindow.js"

/**
 *@param {number | String} n
 *@param {number} pad
 */
const pad = (n, pad = 2) => n.toString().padStart(2, "0")

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const full_months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

/**
 * @param {Date} date
 * @param {boolean} alternative
 */
const format = (date, alternative = false) => {
    const Y = pad(date.getFullYear(), 4)
    const H = pad(date.getHours())
    const M = pad(date.getMinutes())
    const d = pad(date.getDate())
    const m = months[date.getMonth()]
    const full_m = full_months[date.getMonth()]
    const D = days[date.getDay()]
    const indicator = date.getHours() > 12 ? "PM" : "AM"
    return alternative ? `${Y}/${full_m}/${d} ${D} ${H}:${M} ${indicator}` : `${m}-${d} ${D} ${H}:${M}`
}

const alternative = Variable(false)

const date = Variable("", {
    poll: [1000, () => format(new Date(), alternative.value)],
})

const icon = Variable(" ")

export default () => {
    const clockBox = Widget.Box({
        className: "clock box",
        attribute: { alternative: false },
        children: [
            CursorClickArea({
                child: Widget.Label({
                    className: "icon",
                    label: icon.bind(),
                }),
                on_primary_click: () => {
                    alternative.setValue(!alternative.value)
                    icon.setValue(alternative.value ? " " : " ")
                    date.setValue(format(new Date(), alternative.value))
                },
            }),
            CursorClickArea({
                child: Widget.Label({
                    label: date.bind(),
                }),
                on_primary_click: (self, e) => openWindow(self, e, "calendar-menu", () =>
                    App.windows.forEach((w) => {
                        if (w.name?.endsWith("-menu")) w.hide()
                    }),
                ),
                on_secondary_click: () => {
                    alternative.setValue(!alternative.value)
                    date.setValue(format(new Date(), alternative.value))
                    icon.setValue(alternative.value ? " " : " ")
                },
            }),
        ],
    })

    return clockBox
}
