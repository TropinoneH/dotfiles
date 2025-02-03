import { Astal } from "astal/gtk3"
import { exec } from "astal"
import { defaultScheme } from "./themes"

export const theme = (scheme = defaultScheme) => ({
    fg: scheme.fg,
    bg: scheme.bg,
    bar: {
        color: scheme.bg,
        bg: scheme.bg,
        appLauncher: {
            color: scheme.fg,
            bg: scheme.bg
        },
        audio: {
            color: scheme.fg,
            bg: scheme.bg,
            muteColor: scheme.red,
            iconColor: scheme.red
        },
        battery: {
            bg: scheme.bg,
            color: scheme.fg,
            iconColor: scheme.green,
            warningColor: scheme.orange,
            criticalColor: scheme.reddish
        },
        bluetooth: {
            color: scheme.fg,
            bg: scheme.bg,
            iconColor: scheme.blue
        },
        brightness: {
            color: scheme.fg,
            bg: scheme.bg,
            iconColor: scheme.peach
        },
        date: {
            color: scheme.fg,
            bg: scheme.bg,
            iconColor: scheme.violet
        },
        network: {
            color: scheme.fg,
            bg: scheme.bg,
            iconColor: scheme.sky,
            iconDisconnectColor: scheme.magenta
        },
        powermenu: {
            iconColor: scheme.red,
            bg: scheme.bg
        },
        systray: {
            color: scheme.fg,
            bg: scheme.bg
        },
        title: {
            color: scheme.fg,
            bg: scheme.bg
        },
        workspace: {
            color: scheme.fg,
            bg: scheme.bg,
            hover: scheme.text1,
            active: scheme.cyan
        }
    }
})

export const config = {
    theme: theme(),
    bar: {
        appLauncher: {
            onScroll: (_: any, e: Astal.ScrollEvent) => (e.delta_x + e.delta_y > 0 ? exec("wpaperctl next") : exec("wpaperctl previous")),
            onPrimaryClick: () => exec("rofi -show drun -no-default-config -config ~/.config/rofi/full_screen.rasi")
        },
        audio: {
            onClick: (_: any, e: Astal.ClickEvent) => {
                if (e.button === 1) print("pop menu todo")
                else if (e.button === 3) exec("pavucontrol-qt")
            },
            speaker: {
                onScroll: (_: any, e: Astal.ScrollEvent) => exec(`pactl set-sink-volume @DEFAULT_SINK@ ${e.delta_x + e.delta_y > 0 ? "-1%" : "+1%"}`),
                icons: [
                    [["head", "usb"], "󰋋 "],
                    [["bluetooth"], "󰂰 "],
                    [["hdmi"], "󰋌 "],
                    [["pci", ""], " "]
                ]
            },
            microphone: {
                onScroll: (_: any, e: Astal.ScrollEvent) => exec(`pactl set-source-volume @DEFAULT_SOURCE@ ${e.delta_x + e.delta_y > 0 ? "-1%" : "+1%"}`),
                icons: []
            }
        },
        bluetooth: {
            onClick: (_: any, e: Astal.ClickEvent) => {
                if (e.button === 1) print("pop menu todo")
                else if (e.button === 3) exec("rofi-bluetooth -no-default-config -config ~/.config/rofi/config.rasi")
            }
        },
        brightness: {
            onClick: (_: any, e: Astal.ClickEvent) => {
                if (e.button === 1) print("pop menu todo")
            },
            onScroll: (_: any, e: Astal.ScrollEvent) => exec(`brightnessctl set 2%${e.delta_x + e.delta_y > 0 ? "-" : "+"}`),
            icons: ["", "", "", "", "", "", "", "", ""]
        },
        network: {
            onClick: (_: any, e: Astal.ClickEvent) => {
                if (e.button === 1) print("pop menu todo")
                else if (e.button === 3) exec("networkmanager_dmenu -no-default-config -config ~/.config/rofi/config.rasi")
            }
        },
        powermenu: {
            onPrimaryClick: () => exec("wlogout")
        },
        workspace: {
            onScroll: (_: any, e: Astal.ScrollEvent) => exec(`hyprctl dispatch workspace m${e.delta_x + e.delta_y > 0 ? "+" : "-"}1`),
            icons: ["", "", "", "", "", "", "", "", "", ""]
        }
    }
}
