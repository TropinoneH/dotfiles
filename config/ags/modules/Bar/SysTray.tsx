import tray from "gi://AstalTray"
import { bind } from "astal"
import { DimButton } from "../components/Button"
import { App, Gdk } from "astal/gtk3"
import { config } from "../../config"
const Tray = tray.get_default()

export default () => (
    <box css={`background: ${config.theme.bar.systray.bg}; margin-left: 0.3rem; border-radius: 0.5rem;`}>
        {bind(Tray, "items").as((items) =>
            items.map((item) => {
                if (item.iconThemePath) App.add_icons(item.iconThemePath)
                const menu = item.create_menu()
                print(item.isMenu, item.status, item.itemId, item.id)
                return (
                    <DimButton
                        tooltipMarkup={bind(item, "tooltipMarkup")}
                        onDestroy={() => menu?.destroy()}
                        onClickRelease={(self, event) => {
                            if (event.button === 1) item.activate(event.x, event.y)
                            else if (event.button === 3) menu?.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
                        }}
                    >
                        <box css={`background: ${config.theme.bar.systray.bg}; padding: 0 0.5rem; border-radius: 0.5rem;`}>
                            <icon gIcon={bind(item, "gicon")} />
                        </box>
                    </DimButton>
                )
            })
        )}
    </box>
)
