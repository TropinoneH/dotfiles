const Hyprland = await Service.import("hyprland")

export default ({
    name,
    child,
    showClassName = "",
    hideClassName = "",
    ...props
}) =>
    Widget.Window({
        name,
        className: "popup-widget",
        visible: false,
        layer: "overlay",
        keymode: "exclusive",
        ...props,

        child: Widget.Box({
            setup: (self) => {
                if (showClassName != "" && hideClassName != "") {
                    self.hook(App, (self, currentName, visible) => {
                        if (currentName == name) {
                            self.toggleClassName(hideClassName, !visible)
                        }
                    })

                    if (showClassName !== "" && hideClassName !== "") {
                        self.class_name = `${showClassName} ${hideClassName}`
                    }
                }
            },
            child: child,
        }),
        setup: (self) =>
            self
                .hook(
                    App,
                    (self, className, visible) => {
                        if (className === self.name && !visible)
                            self.monitor = Hyprland.active.monitor.id
                    },
                    "window-toggled",
                )
                .keybind("Escape", () => self.set_visible(false)),
    })
