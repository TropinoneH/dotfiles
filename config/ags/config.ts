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
        bluetooth: {
            color: scheme.fg,
            bg: scheme.bg,
            iconColor: scheme.blue,
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
        bluetooth: {
            onClick: (_: any, e: Astal.ClickEvent) => {
                if (e.button === 1) print("pop menu todo")
                else if (e.button === 3) exec("rofi-bluetooth -no-default-config -config ~/.config/rofi/config.rasi")
            }
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
        volume: {
            onClick: (_: any, e: Astal.ClickEvent) => {
                if (e.button === 1) print("pop menu todo")
                else if (e.button === 3) exec("pavucontrol-qt")
            },
            onScroll: (_: any, e: Astal.ScrollEvent) => exec(`pactl set-sink-volume @DEFAULT_SINK@ ${e.delta_x + e.delta_y > 0 ? "+1%" : "-1%"}`)
        },
        workspace: {
            onScroll: (_: any, e: Astal.ScrollEvent) => (e.delta_x + e.delta_y > 0 ? exec("hyprctl dispatch workspace m+1") : exec("hyprctl dispatch workspace m-1")),
            icons: ["", "", "", "", "", "", "", "", "", ""]
        }
    }
}
