const Battery = await Service.import("battery")

const timeFormat = (/**@type{number}*/ time) => {
    const h = Math.round(time / 3600)
    const m = Math.round(Math.round(time % 3600) / 60)
    return `${h} h ${m} min`
}

export default () =>
    Widget.Box({
        className: "battery box",
        children: [
            Widget.Icon({ className: "icon", icon: Battery.bind("icon_name") }),
            Widget.Label({ label: Battery.bind("percent").as((p) => ` ${p}%`) }),
        ],
    }).hook(Battery, (self) => {
        const charging = Battery.charging ? "Charging " : ""
        const time = Battery.charged ? "full" : timeFormat(Battery.time_remaining)
        self.tooltip_markup = `<span background="#191a24">${charging}${time}</span>`
    })
