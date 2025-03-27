import { App, Astal } from "astal/gtk3"
import { exec } from "astal"
import { defaultScheme } from "./themes"
import { EventBox } from "astal/gtk3/widget"
import { setDropWindowOffset } from "./libs/utils"

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
    },
    notifications: {
        fg: scheme.fg,
        bg: scheme.overlay1,
        critical: scheme.reddish,
        warning: scheme.orange,
        info: scheme.overlay2,
        border: scheme.bg,
        actionBg: scheme.overlay3
    },
    dropMenu: {
        fg: scheme.fg,
        bg: scheme.overlay1,
        active: scheme.sky,
        overlay: scheme.overlay3
    }
})

export const config = {
    theme: theme(),
    bar: {
        appLauncher: {
            onClick: () => exec("rofi -show drun -no-default-config -config ~/.config/rofi/full_screen.rasi")
        },
        audio: {
            onClick: (clicked: EventBox, e: Astal.ClickEvent) => {
                if (e.button === 1) {
                    setDropWindowOffset(clicked, "audio-menu")
                    App.toggle_window("audio-menu")
                } else if (e.button === 3) exec("pavucontrol-qt")
            },
            speaker: {
                onScroll: (_: any, e: Astal.ScrollEvent) => exec(`pactl set-sink-volume @DEFAULT_SINK@ ${e.delta_x + e.delta_y > 0 ? "-1%" : "+1%"}`),
                icons: [
                    ["head", "󰋋 "],
                    ["usb", "󰋋 "],
                    ["bluetooth", "󰂰 "],
                    ["hdmi", "󰋌 "],
                    ["pci", " "],
                    ["", " "]
                ] as [string, string][]
            },
            microphone: {
                onScroll: (_: any, e: Astal.ScrollEvent) => exec(`pactl set-source-volume @DEFAULT_SOURCE@ ${e.delta_x + e.delta_y > 0 ? "-1%" : "+1%"}`),
                icons: [] as [string, string][]
            }
        },
        battery: {
            onClick: (clicked: EventBox, e: Astal.ClickEvent) => {
                if (e.button === 1) {
                    setDropWindowOffset(clicked, "battery-menu")
                    App.toggle_window("battery-menu")
                }
            }
        },
        bluetooth: {
            onClick: (clicked: EventBox, e: Astal.ClickEvent) => {
                if (e.button === 1) {
                    setDropWindowOffset(clicked, "bluetooth-menu")
                    App.toggle_window("bluetooth-menu")
                } else if (e.button === 3) exec("rofi-bluetooth -no-default-config -config ~/.config/rofi/config.rasi")
            }
        },
        brightness: {
            onClick: (clicked: EventBox, e: Astal.ClickEvent) => {
                if (e.button === 1) {
                    setDropWindowOffset(clicked, "backlight-menu")
                    App.toggle_window("backlight-menu")
                }
            },
            onScroll: (_: any, e: Astal.ScrollEvent) => exec(`brightnessctl set 2%${e.delta_x + e.delta_y > 0 ? "-" : "+"}`),
            icons: ["", "", "", "", "", "", "", "", ""]
        },
        network: {
            onClick: (clicked: EventBox, e: Astal.ClickEvent) => {
                if (e.button === 1) {
                    setDropWindowOffset(clicked, "network-menu")
                    App.toggle_window("network-menu")
                } else if (e.button === 3) exec("networkmanager_dmenu -no-default-config -config ~/.config/rofi/config.rasi")
            }
        },
        powermenu: {
            onPrimaryClick: () => exec("wlogout")
        },
        workspace: {
            onScroll: (_: any, e: Astal.ScrollEvent) => exec(`hyprctl dispatch workspace m${e.delta_x + e.delta_y > 0 ? "+" : "-"}1`),
            icons: ["󰎤", "󰎧", "󰎪", "󰎭", "󰎱", "󰎳", "󰎶", "󰎹", "󰎼", "󰽽"]
        }
    },
    notifications: {
        timeout: 5000,
        doCache: true,
        displayTotal: 5
    }
}
