import OverviewRow from "./OverviewRow.js"

const overviewTick = Variable(false)

export default () => {
    const clientMap = new Map()
    return Widget.Box({
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
    })
}
