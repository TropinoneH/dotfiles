import { Astal, Gtk } from "astal/gtk3"
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
        }
    }
})

export const config = {
    theme: theme(),
    bar: {
        appLauncher: {
            onScroll: (_: any, e: Astal.ScrollEvent) => (e.delta_x + e.delta_y > 0 ? exec("wpaperctl next") : exec("wpaperctl previous")),
            onPrimaryClick: () => exec("rofi -show drun -no-default-config -config ~/.config/rofi/full_screen.rasi")
        }
    }
}
