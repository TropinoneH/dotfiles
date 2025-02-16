import AstalTray from "gi://AstalTray?version=0.1"
import { bind, Gio, Variable } from "astal"
import { Gdk, Gtk } from "astal/gtk3"
import { config } from "../../config"

interface MenuEntryProps {
    item: AstalTray.TrayItem
    child?: JSX.Element
}

const systemtray = AstalTray.get_default()

// TODO: Connect to `notify::menu-model` and `notify::action-group` to have up to date menu and action group
const createMenu = (menuModel: Gio.MenuModel, actionGroup: Gio.ActionGroup | null): Gtk.Menu => {
    const menu = Gtk.Menu.new_from_model(menuModel)
    menu.insert_action_group("dbusmenu", actionGroup)

    return menu
}

const MenuDefaultIcon = ({ item }: MenuEntryProps): JSX.Element => {
    return <icon className={"systray-icon"} gIcon={bind(item, "gicon")} tooltipMarkup={bind(item, "tooltipMarkup")} />
}

const MenuEntry = ({ item, child }: MenuEntryProps): JSX.Element => {
    let menu: Gtk.Menu

    const entryBinding = Variable.derive([bind(item, "menuModel"), bind(item, "actionGroup")], (menuModel, actionGroup) => {
        if (!menuModel) {
            return console.error(`Menu Model not found for ${item.id}`)
        }
        if (!actionGroup) {
            return console.error(`Action Group not found for ${item.id}`)
        }

        menu = createMenu(menuModel, actionGroup)
    })

    return (
        <button
            cursor="pointer"
            onClick={(self, event) => {
                if (event.button === 1) item.activate(0, 0)
                else if (event.button === 3) menu?.popup_at_widget(self, Gdk.Gravity.NORTH, Gdk.Gravity.SOUTH, null)
            }}
            onDestroy={() => {
                menu?.destroy()
                entryBinding.drop()
            }}
        >
            {child}
        </button>
    )
}

export default () => (
    <box
        css={`
            background: ${config.theme.bar.systray.bg};
            color: ${config.theme.bar.systray.color};
            margin-left: 0.3rem;
            border-radius: 0.5rem;
        `}
    >
        {bind(systemtray, "items").as((items) =>
            items.map((item) => (
                <MenuEntry item={item}>
                    <MenuDefaultIcon item={item} />
                </MenuEntry>
            ))
        )}
    </box>
)
