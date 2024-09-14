const { GLib } = imports.gi

import { darkMode } from "./modules/utils/system.js"

const userConfigs = {
    monitors: {
        scaleMethod: "gdk",
    },
    icons: {
        symbolicIconTheme: {
            light: "Tela-light",
            dark: "Tela-dark",
        },
        substitutions: {
            "code-url-handler": "visual-studio-code",
            Code: "visual-studio-code",
            "pavucontrol-qt": "pavucontrol",
            "": "image-missing",
        },
        regexSubstitutions: [
            {
                regex: /^steam_app_(\d+)$/,
                replace: "steam_icon_$1",
            },
        ],
    },
    overview: {
        numOfCols: 5,
        numOfRows: 2,
        scale: 0.18,
        wsNumScale: 0.09,
        wsNumMarginScale: 0.07,
    },
    animations: {
        choreographyDelay: 35,
        durationSmall: 110,
        durationLarge: 180,
    },
}

globalThis["userConfigs"] = userConfigs

export const handleStyle = (/** @type {boolean} */ resetMusic) => {
    // Reset
    Utils.exec(`mkdir -p "${GLib.get_user_state_dir()}/ags/scss"`)
    if (resetMusic) {
        Utils.exec(`bash -c 'echo "" > ${GLib.get_user_state_dir()}/ags/scss/_musicwal.scss'`) // reset music styles
        Utils.exec(`bash -c 'echo "" > ${GLib.get_user_state_dir()}/ags/scss/_musicmaterial.scss'`) // reset music styles
    }
    // Generate overrides
    let lightdark = darkMode.value ? "dark" : "light"
    Utils.writeFileSync(
        `@mixin symbolic-icon {
    -gtk-icon-theme: '${userConfigs.icons.symbolicIconTheme[lightdark]}';
}
`,
        `${GLib.get_user_state_dir()}/ags/scss/_lib_mixins_overrides.scss`,
    )
    // Compile and apply
    async function applyStyle() {
        Utils.exec(`mkdir -p ${COMPILED_STYLE_DIR}`)
        Utils.exec(
            `sass -I "${GLib.get_user_state_dir()}/ags/scss" -I "${App.configDir}/scss/fallback" "${App.configDir}/scss/main.scss" "${COMPILED_STYLE_DIR}/style.css"`,
        )
        App.resetCss()
        App.applyCss(`${COMPILED_STYLE_DIR}/style.css`)
        console.log("[LOG] Styles loaded")
    }
    applyStyle().catch(print)
}

export const COMPILED_STYLE_DIR = `${GLib.get_user_cache_dir()}/ags/user/generated`
