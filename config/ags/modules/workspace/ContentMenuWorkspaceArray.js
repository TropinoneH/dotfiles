const { Gtk } = imports.gi

const Hyprland = await Service.import("hyprland")

const NUM_OF_WORKSPACES_SHOWN = userConfigs.overview.numOfCols * userConfigs.overview.numOfRows

export default ({ label, actionFunc, thisWorkspace }, /**@type{ReturnType<typeof Variable<boolean>>}*/ overviewTick) =>
    Widget.MenuItem({
        label: label,
        setup: (menuItem) => {
            let submenu = new Gtk.Menu()
            submenu.className = "menu"

            const offset =
                Math.floor((Hyprland.active.workspace.id - 1) / NUM_OF_WORKSPACES_SHOWN) * NUM_OF_WORKSPACES_SHOWN

            const startWorkspace = offset + 1
            const endWorkspace = startWorkspace + NUM_OF_WORKSPACES_SHOWN - 1

            for (let i = startWorkspace; i <= endWorkspace; i++) {
                let button = new Gtk.MenuItem({
                    label: `Workspace ${i}`,
                })
                button.connect("activate", () => {
                    // execAsync([`${onClickBinary}`, `${thisWorkspace}`, `${i}`]).catch(print)
                    actionFunc(thisWorkspace, i)
                    overviewTick.setValue(!overviewTick.value)
                })
                submenu.append(button)
            }

            menuItem.set_reserve_indicator(true)
            menuItem.set_submenu(submenu)
        },
    })
