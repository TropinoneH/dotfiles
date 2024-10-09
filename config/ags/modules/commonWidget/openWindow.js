import Gdk from "gi://Gdk?version=3.0"

import { monitors } from "../utils/hyprlandData.js"

const Hyprland = await Service.import("hyprland")

const margin = Variable([0, 0, 0, 0])

const getMargin = (
    /**@type{number}*/ adjustedXCoord,
    /**@type{boolean}*/ fixed = false,
) => {
    const curMonitor = monitors[Hyprland.active.monitor.id]
    let monHeight = curMonitor?.height
    let monWidth = curMonitor?.width
    if (monHeight == undefined || monWidth === undefined) return undefined
    const vertical = curMonitor?.transform !== undefined ? curMonitor.transform % 2 !== 0 : false
    if (vertical) [monHeight, monWidth] = [monWidth, monHeight]

    let marginRight = fixed ? monWidth / 2 : monWidth - adjustedXCoord
    let marginLeft = monWidth - marginRight
    let marginTop = 0
    let marginBottom = monHeight

    margin.setValue([marginLeft, marginRight, marginTop, marginBottom])
}

export const moveToCursor = (/**@type{ReturnType<typeof Widget.EventBox<any, unknown>>}*/ widget) => {
    margin.connect("changed", () => {
        const value = margin.getValue()
        const winWidth = widget.child.get_allocated_width()
        const curMonitor = monitors[Hyprland.active.monitor.id]
        const monWidth = (curMonitor?.transform !== undefined ? curMonitor.transform % 2 !== 0 : false)? curMonitor?.height : curMonitor?.width
        widget.set_margin_left(value[0] + winWidth / 2 >= monWidth? value[0] - winWidth / 2 : value[0])
        widget.set_margin_right(value[1])
        widget.set_margin_top(value[2])
        widget.set_margin_bottom(value[3])
    })
}

export default (
    /**@type{ReturnType<typeof Widget.EventBox>}*/ widget,
    /**@type{Gdk.Event}*/ event,
    /**@type{String}*/ name,
    beforeToggle = () => {},
) => {
    const middleOfButton = Math.floor(widget.get_allocated_width() / 2)
    const xAxisOfButtonClick = widget.get_pointer()[0]
    const middleOffset = middleOfButton - xAxisOfButtonClick

    const clickPos = event.get_root_coords()
    const adjustedXCoord = clickPos[1] + middleOffset
    const win = App.windows.find((win) => win.name == name)
    if (win === undefined) {
        console.error(`Error: window ${name} not found`)
        return
    }
    beforeToggle()
    getMargin(adjustedXCoord)
    App.toggleWindow(win.name || name)
}
