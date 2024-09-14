export const closeEveryThing = () => {
    // const numMonitors = Gdk.Display.get_default()?.get_n_monitors() || 1
    App.windows.forEach((win) => {
        win.set_visible(false)
    })
}
