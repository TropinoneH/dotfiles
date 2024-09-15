import OverviewRow from "./overviewRow.js"

const Hyprland = await Service.import("hyprland")
const overviewTick = Variable(false)

export default () => {
    const clientMap = new Map()
    return Widget.Revealer({
        revealChild: true,
        // hpack to prevent unneeded expansion in overview-tasks-workspace:
        hpack: "center",
        transition: "slide_down",
        transitionDuration: userConfigs.animations.durationLarge,
        child: Widget.Box({
            vertical: true,
            className: "overview-tasks",
            children: Array.from({ length: userConfigs.overview.numOfRows }, (_, index) =>
                OverviewRow(
                    {
                        startWorkspace: 1 + index * userConfigs.overview.numOfCols,
                        workspaces: userConfigs.overview.numOfCols,
                    },
                    overviewTick,
                    clientMap,
                ),
            ),
        }),
    })
}
