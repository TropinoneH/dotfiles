import Workspace from "./Workspace.js"

const Hyprland = await Service.import("hyprland")

const NUM_OF_WORKSPACES_SHOWN = userConfigs.overview.numOfCols * userConfigs.overview.numOfRows

const arr = (s, n) => {
    const array = []
    for (let i = 0; i < n; i++) array.push(s + i)

    return array
}

export default (
    { startWorkspace, workspaces, windowName = "overview" },
    /**@type{ReturnType<typeof Variable<boolean>>}*/ overviewTick,
    /**@type{Map}*/ clientMap,
) =>
    Widget.Box({
        children: arr(startWorkspace, workspaces).map((i) => Workspace(i, Hyprland.active.monitor.id, overviewTick, clientMap)),
        attribute: {
            workspaceGroup: Math.floor((Hyprland.active.workspace.id - 1) / NUM_OF_WORKSPACES_SHOWN),
            monitorMap: [],
            getMonitorMap: (box) => {
                Utils.execAsync("hyprctl -j monitors").then((monitors) => {
                    box.attribute.monitorMap = JSON.parse(monitors).reduce((acc, item) => {
                        acc[item.id] = { x: item.x, y: item.y }
                        return acc
                    }, {})
                })
            },
            update: (box) => {
                const offset =
                    Math.floor((Hyprland.active.workspace.id - 1) / NUM_OF_WORKSPACES_SHOWN) * NUM_OF_WORKSPACES_SHOWN
                Hyprland.messageAsync("j/clients")
                    .then((clients) => {
                        const allClients = JSON.parse(clients)
                        const kids = box.get_children()
                        kids.forEach((kid) => kid.clear())
                        for (let i = 0; i < allClients.length; i++) {
                            const client = allClients[i]
                            const childID = client.workspace.id - (offset + startWorkspace)
                            if (
                                offset + startWorkspace <= client.workspace.id &&
                                client.workspace.id <= offset + startWorkspace + workspaces
                            ) {
                                const screenCoords = box.attribute.monitorMap[client.monitor]
                                if (kids[childID]) {
                                    kids[childID].set(client, screenCoords)
                                }
                                continue
                            }
                        }
                        kids.forEach((kid) => kid.show())
                    })
                    .catch(print)
            },
            updateWorkspace: (box, id) => {
                const offset =
                    Math.floor((Hyprland.active.workspace.id - 1) / NUM_OF_WORKSPACES_SHOWN) * NUM_OF_WORKSPACES_SHOWN
                if (
                    !(
                        // Not in range, ignore
                        (offset + startWorkspace <= id && id <= offset + startWorkspace + workspaces)
                    )
                )
                    return
                // if (!App.getWindow(windowName)?.visible) return;
                Hyprland.messageAsync("j/clients")
                    .then((clients) => {
                        const allClients = JSON.parse(clients)
                        const kids = box.get_children()
                        for (let i = 0; i < allClients.length; i++) {
                            const client = allClients[i]
                            if (client.workspace.id != id) continue
                            const screenCoords = box.attribute.monitorMap[client.monitor]
                            kids[id - (offset + startWorkspace)]?.set(client, screenCoords)
                        }
                        kids[id - (offset + startWorkspace)]?.show()
                    })
                    .catch(print)
            },
        },
        setup: (box) => {
            box.attribute.getMonitorMap(box)
            box.hook(overviewTick, (box) => box.attribute.update(box))
                .hook(
                    Hyprland,
                    (box, clientAddress) => {
                        const offset =
                            Math.floor((Hyprland.active.workspace.id - 1) / NUM_OF_WORKSPACES_SHOWN) *
                            NUM_OF_WORKSPACES_SHOWN
                        const kids = box.get_children()
                        const client = Hyprland.getClient(clientAddress)
                        if (!client) return
                        const id = client.workspace.id

                        box.attribute.updateWorkspace(box, id)
                        kids[id - (offset + startWorkspace)]?.unset(clientAddress)
                    },
                    "client-removed",
                )
                .hook(
                    Hyprland,
                    (box, clientAddress) => {
                        const client = Hyprland.getClient(clientAddress)
                        if (!client) return
                        box.attribute.updateWorkspace(box, client.workspace.id)
                    },
                    "client-added",
                )
                .hook(Hyprland.active.workspace, (box) => {
                    // Full update when going to new ws group
                    const previousGroup = box.attribute.workspaceGroup
                    const currentGroup = Math.floor((Hyprland.active.workspace.id - 1) / NUM_OF_WORKSPACES_SHOWN)
                    if (currentGroup !== previousGroup) {
                        if (!App.getWindow(windowName) || !App.getWindow(windowName)?.visible) return
                        box.attribute.update(box)
                        box.attribute.workspaceGroup = currentGroup
                    }
                })
                .hook(App, (box, name, visible) => {
                    // Update on open
                    if (name == "overview" && visible) box.attribute.update(box)
                })
        },
    })
