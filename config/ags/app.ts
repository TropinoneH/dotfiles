import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./modules/Bar"
import { mapAllMonitors } from "./libs/monitor"

App.start({
    css: style,
    main() {
        const allMonitorsApps = [Bar]

        mapAllMonitors(allMonitorsApps)
        App.connect("monitor-added", () => mapAllMonitors(allMonitorsApps))
        App.connect("monitor-removed", () => mapAllMonitors(allMonitorsApps))
    }
})
