import PopupWidget from "../commonWidget/PopupWidget.js"
import ClickCloseRegion from "../commonWidget/ClickCloseRegion.js"

const Hyprland = await Service.import("hyprland")

const overviewContent = await (async () => {
    return (await import("./Overview.js")).default()
})()

export default () =>
    PopupWidget({
        name: "overview",
        className: "overview",
        anchor: ["top", "bottom", "right", "left"],
        keymode: "on-demand",
        child: Widget.Box({
            vertical: true,
            children: [
                ClickCloseRegion({ name: "overview" }),
                Widget.Box({
                    children: [
                        ClickCloseRegion({ name: "overview" }),
                        overviewContent,
                        ClickCloseRegion({ name: "overview" }),
                    ],
                }),
                ClickCloseRegion({ name: "overview" }),
            ],
        }),
    })
        .keybind("1", () => {
            App.closeWindow("overview")
            Hyprland.messageAsync("dispatch workspace 1")
        })
        .keybind("2", () => {
            App.closeWindow("overview")
            Hyprland.messageAsync("dispatch workspace 2")
        })
        .keybind("3", () => {
            App.closeWindow("overview")
            Hyprland.messageAsync("dispatch workspace 3")
        })
        .keybind("4", () => {
            App.closeWindow("overview")
            Hyprland.messageAsync("dispatch workspace 4")
        })
        .keybind("5", () => {
            App.closeWindow("overview")
            Hyprland.messageAsync("dispatch workspace 5")
        })
        .keybind("6", () => {
            App.closeWindow("overview")
            Hyprland.messageAsync("dispatch workspace 6")
        })
        .keybind("7", () => {
            App.closeWindow("overview")
            Hyprland.messageAsync("dispatch workspace 7")
        })
        .keybind("8", () => {
            App.closeWindow("overview")
            Hyprland.messageAsync("dispatch workspace 8")
        })
        .keybind("9", () => {
            App.closeWindow("overview")
            Hyprland.messageAsync("dispatch workspace 9")
        })
        .keybind("0", () => {
            App.closeWindow("overview")
            Hyprland.messageAsync("dispatch workspace 10")
        })
