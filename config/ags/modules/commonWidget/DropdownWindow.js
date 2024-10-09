import { moveToCursor } from "./openWindow.js"

const createEventBox = (/**@type{string}*/ windowName) => {
    return Widget.EventBox({
        hexpand: true,
        vexpand: false,
        can_focus: false,
        child: Widget.Box(),
        setup: (w) => {
            w.on("button-press-event", () => App.toggleWindow(windowName))
        },
    })
}

export default (
    /**@type{{name: string} & import("types/widgets/window").WindowProps}*/ {
        name,
        className,
        exclusivity,
        child,
        ...props
    },
    /**@type{import("types/widgets/revealer").Transition}*/ transition,
) =>
    Widget.Window({
        name,
        exclusivity,
        className: `${className || ""} dropdown-window`,
        setup: (self) => self.keybind("Escape", () => App.closeWindow(name)),
        visible: false,
        layer: "top",
        anchor: ["top"],
        keymode: "on-demand",
        child: Widget.EventBox({
            on_primary_click: () => App.closeWindow(name),
            on_secondary_click: () => App.closeWindow(name),
            child: Widget.Box({
                vertical: true,
                children: [
                    Widget.Box({
                        className: "event-box-container",
                        children: [createEventBox(name), createEventBox(name)],
                    }),
                    Widget.EventBox({
                        on_primary_click: () => true,
                        on_secondary_click: () => true,
                        setup: (self) => moveToCursor(self),
                        child: Widget.Box({
                            class_name: "dropdown-menu-container",
                            css: "padding: 1px; margin: -1px;",
                            child: Widget.Revealer({
                                revealChild: false,
                                setup: (self) =>
                                    self.hook(App, (_, wname, visible) => {
                                        if (wname === name) self.reveal_child = visible
                                    }),
                                transition,
                                transitionDuration: 350,
                                child: Widget.Box({
                                    class_name: "dropdown-menu-container",
                                    can_focus: true,
                                    child: child,
                                }),
                            }),
                        }),
                    }),
                    Widget.Box({
                        className: "event-box-container",
                        children: [createEventBox(name), createEventBox(name)],
                    }),
                ],
            }),
        }),
        ...props,
    })
