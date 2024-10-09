const Hyprland = await Service.import("hyprland")

export default ({ name, child, showClassName = "", hideClassName = "", ...props }) =>
    Widget.Window({
        name,
        visible: false,
        layer: "overlay",
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
    })
        .hook(
            App,
            (self, className, visible) => {
                if (visible && className == self.name) self.monitor = Hyprland.active.monitor.id
            },
            "window-toggled",
        )
        .keybind("Escape", (self) => self.set_visible(false))
