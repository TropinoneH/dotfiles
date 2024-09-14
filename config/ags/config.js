import "./userConfigs.js"
import Workspace from "./modules/workspace/main.js"
import Bar from "./modules/bar/main.js"

App.config({
    style: "./styles/index.css",
    windows: [Workspace()],
})
