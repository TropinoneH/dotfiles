const Battery = await Service.import("battery")

export default () => {
    const value = Battery.bind("percent").as((p) => (p > 0 ? p / 100 : 0))
    const icon = Battery.bind("percent").as((p) => `battery-level-${Math.floor(p / 10) * 10}-symbolic`)

    return Widget.Box({
        class_name: "battery",
        visible: Battery.bind("available"),
        children: [
            Widget.Icon({ icon }),
            Widget.LevelBar({
                widthRequest: 140,
                vpack: "center",
                value,
            }),
        ],
    })
}
