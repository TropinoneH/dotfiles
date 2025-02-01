import battery from "gi://AstalBattery"
import { bind } from "astal"
import { Box } from "astal/gtk3/widget"
import { config } from "../../config"
const Battery = battery.get_default()

const timeFormat = (time: number) => {
    const h = Math.round(time / 3600)
    const m = Math.round(Math.round(time % 3600) / 60)
    return `${h} h ${m} min`
}

export default () => {
    const theme = config.theme.bar.battery
    const percentage = bind(Battery, "percentage")

    const setup = (box: Box) => {
        const charging = Battery.get_charging() ? "Charging " : ""
        const time_remain = Battery.get_charging() ? Battery.get_time_to_full() : Battery.get_time_to_empty()
        const time = Battery.get_charging() && Battery.get_percentage() === 1 ? "Full" : timeFormat(time_remain)
        box.tooltipText = `${charging}${time}`
        box.hook(Battery, "notify", () => {
            const charging = Battery.get_charging() ? "Charging " : ""
            const time_remain = Battery.get_charging() ? Battery.get_time_to_full() : Battery.get_time_to_empty()
            const time = Battery.get_charging() && Battery.get_percentage() === 1 ? "Full" : timeFormat(time_remain)
            box.tooltipText = `${charging}${time}`
        })
    }

    return (
        <box
            css={`
                background: ${theme.bg};
                color: ${theme.color};
                padding: 0 0.5rem;
                margin-left: 0.3rem;
                border-radius: 0.5rem;
            `}
            setup={setup}
        >
            <icon
                icon={bind(Battery, "batteryIconName")}
                css={percentage.as((p) =>
                    p * 100 <= 20 ? `color: ${theme.criticalColor};` : p * 100 <= 30 ? `color: ${theme.warningColor};` : `color: ${theme.iconColor};`
                )}
            />
            <label label={percentage.as((p) => ` ${Math.floor(p * 100)}%`)} />
        </box>
    )
}
