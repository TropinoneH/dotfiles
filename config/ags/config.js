import "./userConfigs.js"
import Workspace from "./modules/workspace/main.js"
import Bar, { windows as barPopWindows } from "./modules/bar/main.js"
import { forAllMonitors } from "./modules/utils/range.js"

// import bug from "./test/clients.bug.js"
// bug()

App.config({
    style: "./styles/index.css",
    windows: [Workspace(), ...forAllMonitors(Bar), ...barPopWindows],
    // windows: [Bar(), Workspace(), ...barPopWindows], // for develop and debug
})
