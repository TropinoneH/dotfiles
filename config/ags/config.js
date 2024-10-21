import "./userConfigs.js"
import Workspace from "./modules/workspace/main.js"
import Bar, { windows as barPopWindows } from "./modules/bar/main.js"
import Notification from "./modules/notification/main.js"
import { forAllMonitors } from "./modules/utils/range.js"

App.config({
    style: "./styles/index.css",
    windows: [Workspace(), ...forAllMonitors(Bar), ...barPopWindows, Notification()],
})
