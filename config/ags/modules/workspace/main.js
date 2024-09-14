import PopupWidget from "../commonWidget/popupwidget.js"
import clickCloseRegion from "../commonWidget/clickCloseRegion.js"

const Hyprland = await Service.import("hyprland")

const overviewContent = await (async () => {
    return (await import("./overview.js")).default()
})()

export default () =>
    PopupWidget({
        name: "overview",
        anchor: ["top", "bottom", "right", "left"],
        keymode: "on-demand",
        child: Widget.Box({
            vertical: true,
            children: [
                clickCloseRegion({ name: "overview", expand: false }),
                Widget.Box({
                    children: [
                        clickCloseRegion({ name: "overview" }),
                        overviewContent,
                        clickCloseRegion({ name: "overview" }),
                    ],
                }),
                clickCloseRegion({ name: "overview" }),
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
