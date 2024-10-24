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
            "Google-chrome": "google-chrome",
            "io.github.Qalculate.qalculate-qt": "qalculate",
            "io.github.Qalculate.qalculate-gtk": "qalculate",
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
        animations: {
            choreographyDelay: 35,
            durationSmall: 110,
            durationLarge: 180,
        },
    },
    bar: {
        scripts: {
            appLauncher: {
                onClick: "rofi -show drun -no-default-config -config ~/.config/rofi/full_screen.rasi",
                onScrollUp: "wpaperctl previous",
                onScrollDown: "wpaperctl next",
            },
            backlight: {
                onScrollUp: "brightnessctl set 2%+",
                onScrollDown: "brightnessctl set 2%-",
            },
            bluetooth: "rofi-bluetooth -no-default-config -config ~/.config/rofi/config.rasi",
            network: "networkmanager_dmenu -no-default-config -config ~/.config/rofi/config.rasi",
            workspaces: {
                onScrollUp: "hyprctl dispatch workspace m-1",
                onScrollDown: "hyprctl dispatch workspace m+1",
            },
            powermenu: "wlogout",
            volume: {
                onClick: "pactl set-sink-mute @DEFAULT_SINK@ toggle",
                onRightClick: "pavucontrol-qt",
                onScrollUp: "pactl set-sink-volume @DEFAULT_SINK@ +1%",
                onScrollDown: "pactl set-sink-volume @DEFAULT_SINK@ -1%",
            },
        },
        icons: {
            workspaces: ["", "", "", "", "", "", "", "", "", ""],
            audio: {
                speaker: {
                    headphone: "",
                    "hands-free": "",
                    headset: "",
                    phone: "",
                    portable: "",
                    car: "",
                    mute: "",
                    default: ["󰖀", "󰕾"],
                },
                microphone: [
                    "microphone-disabled-symbolic",
                    "microphone-sensitivity-low-symbolic",
                    "microphone-sensitivity-medium-symbolic",
                    "microphone-sensitivity-high-symbolic",
                    "microphone-sensitivity-high-symbolic",
                ],
            },
            bluetooth: {
                battery: ["󰤾", "󰤿", "󰥀", "󰥁", "󰥂", "󰥃", "󰥄", "󰥅", "󰥆", "󰥈"],
                deviceMap: [
                    ["^audio-card*", "󰎄"],
                    ["^audio-headphones*", "󰋋"],
                    ["^audio-headset*", "󰋎"],
                    ["^audio-input*", "󰍬"],
                    ["^audio-speakers*", "󰓃"],
                    ["^bluetooth*", "󰂯"],
                    ["^camera*", "󰄀"],
                    ["^computer*", "󰟀"],
                    ["^input-gaming*", "󰍬"],
                    ["^input-keyboard*", "󰌌"],
                    ["^input-mouse*", "󰍽"],
                    ["^input-tablet*", "󰓶"],
                    ["^media*", "󱛟"],
                    ["^modem*", "󱂇"],
                    ["^network*", "󱂇"],
                    ["^phone*", "󰄞"],
                    ["^printer*", "󰐪"],
                    ["^scanner*", "󰚫"],
                    ["^video-camera*", "󰕧"],
                ],
            },
            backlight: ["", "", "", "", "", "", "", "", ""],
            network: {
                wifi: [
                    ["network-wireless-acquiring", "󰤩"],
                    ["network-wireless-connected", "󰤨"],
                    ["network-wireless-encrypted", "󰤪"],
                    ["network-wireless-hotspot", "󰤨"],
                    ["network-wireless-no-route", "󰤩"],
                    ["network-wireless-offline", "󰤮"],
                    ["network-wireless-signal-excellent", "󰤨"],
                    ["network-wireless-signal-good", "󰤥"],
                    ["network-wireless-signal-ok", "󰤢"],
                    ["network-wireless-signal-weak", "󰤟"],
                    ["network-wireless-signal-none", "󰤯"],
                ],
            },
        },
        title: {
            length: 10,
        },
        network: {
            device_type: {
                wired: "enp",
                wifi: "wlan",
            },
        },
    },
    notifications: {
        timeout: 5000,
        doCache: true,
        displayTotal: 5,
    }
}

globalThis["userConfigs"] = userConfigs
