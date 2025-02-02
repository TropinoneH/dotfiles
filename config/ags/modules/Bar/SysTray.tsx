import tray from "gi://AstalTray"
import { bind } from "astal"
import { config } from "../../config"
const Tray = tray.get_default()

export default () => (
    <box
        css={`
            background: ${config.theme.bar.systray.bg};
            color: ${config.theme.bar.systray.color};
            margin-left: 0.3rem;
            border-radius: 0.5rem;
        `}
    >
        {bind(Tray, "items").as((items) =>
            items.map((item) => (
                <menubutton
                    tooltipMarkup={bind(item, "tooltipMarkup")}
                    usePopover={false}
                    actionGroup={bind(item, "actionGroup").as((ag) => ["dbusmenu", ag])}
                    menuModel={bind(item, "menuModel")}
                >
                    <icon gicon={bind(item, "gicon")} />
                </menubutton>
            ))
        )}
    </box>
)
