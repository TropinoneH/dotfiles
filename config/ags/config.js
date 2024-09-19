import "./userConfigs.js"
import Workspace from "./modules/workspace/main.js"
import Bar from "./modules/bar/main.js"
import { forAllMonitors } from "./modules/utils/range.js"

App.config({
    style: "./styles/index.css",
    // windows: [Workspace(), ...forAllMonitors(Bar)],
    // windows: [Bar()], // for develop and debug
    windows: [Workspace()],
})
