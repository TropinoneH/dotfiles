const Network = await Service.import("network")

export default () => {
    const box = Widget.Box({
        class_name: "network-element-item",
        child: Widget.Box({
            hpack: "start",
            children: [
                Widget.Icon({
                    class_name: Network.wired
                        .bind("state")
                        .as((s) => `network-icon ethernet ${s === "activated" ? "active" : ""}`),
                    tooltip_text: Network.wired.bind("internet"),
                    icon: Network.wired.bind("icon_name"),
                }),
                Widget.Box({
                    class_name: "connection-container",
                    vertical: true,
                    children: [
                        Widget.Label({
                            class_name: "active-connection",
                            hpack: "start",
                            truncate: "end",
                            wrap: true,
                            label: Network.bind("primary").as((net) => {
                                if (net !== "wired") return Network.wired.state
                                const curNet = JSON.parse(Utils.exec("ip -j addr")).filter((i) =>
                                    i["ifname"].includes(userConfigs.bar.network.device_type.wired),
                                )[0]
                                const netInfo = curNet["addr_info"].filter((i) => i["family"] === "inet")[0]
                                return `${curNet["ifname"].slice(0, 3)}: ${netInfo["local"]}/${netInfo["prefixlen"]}`
                            }),
                            tooltip_text: Utils.merge([Network.bind("primary"), Network.bind("wired")], (net, w) =>
                                net === "wired" ? `${w.state} (${w.speed} Mbps)` : "",
                            ),
                        }),
                        Widget.Label({
                            hpack: "start",
                            class_name: "connection-status dim",
                            label: Network.wired.bind("internet").as((i) => i.charAt(0).toUpperCase() + i.slice(1)),
                        }),
                    ],
                }),
            ],
        }),
    })
    return Widget.Box({
        class_name: "menu-section-container ethernet",
        vertical: true,
        children: [
            Widget.Box({
                class_name: "menu-label-container",
                hpack: "fill",
                child: Widget.Label({
                    class_name: "menu-label",
                    hexpand: true,
                    hpack: "start",
                    label: "Ethernet",
                }),
            }),
            Widget.Box({
                class_name: "menu-items-section",
                vertical: true,
                child: Widget.Box({
                    class_name: "menu-content",
                    vertical: true,
                    child: box,
                }),
            }),
        ],
    })
}
