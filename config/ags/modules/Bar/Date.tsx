import { bind, Variable } from "astal"
import { config } from "../../config"

const pad = (n: number, pad: number = 2) => n.toString().padStart(pad, "0")

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const full_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const format = (date: Date, alternative: boolean = false) => {
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

export default () => {
    const alternative = Variable(false)
    const date = Variable("").poll(1000, (_) => format(new Date(), alternative.get()))
    const icon = Variable(" ")
    alternative.subscribe((value) => {
        date.set(format(new Date(), value))
        icon.set(value ? " " : " ")
    })
    return (
        <box
            css={`
                margin-left: -0.36rem;
                padding: 0.5rem 0.7rem 0.5rem 0.7rem;
                border-radius: 0.5rem;
                background-color: ${config.theme.bar.date.bg};
                color: ${config.theme.bar.date.color};
            `}
        >
            <eventbox
                onClick={() => alternative.set(!alternative.get())}
                onDestroy={() => {
                    alternative.drop()
                    date.drop()
                }}
            >
                <box>
                    <label css={`color: ${config.theme.bar.date.iconColor};`} label={bind(icon).as((v) => v)} />
                    {bind(date).as((v) => v)}
                </box>
            </eventbox>
        </box>
    )
}
