const { GLib } = imports.gi

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
