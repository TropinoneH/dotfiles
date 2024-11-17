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
        date: {
            color: scheme.fg,
            bg: scheme.bg,
            iconColor: scheme.violet
        },
        powermenu: {
            iconColor: scheme.red,
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
        powermenu: {
            onPrimaryClick: () => exec("wlogout")
        },
        workspace: {
            onScroll: (_: any, e: Astal.ScrollEvent) => (e.delta_x + e.delta_y > 0 ? exec("hyprctl dispatch workspace m+1") : exec("hyprctl dispatch workspace m-1")),
            icons: ["", "", "", "", "", "", "", "", "", ""]
        }
    }
}
