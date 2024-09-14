import { COMPILED_STYLE_DIR, handleStyle } from "./userConfigs.js"
import Workspace from "./modules/workspace/main.js"

handleStyle(true)

App.applyCss(`${COMPILED_STYLE_DIR}/style.css`)

App.config({
    windows: [Workspace()],
})
