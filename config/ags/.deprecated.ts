// type SigHandler<W extends InstanceType<typeof Gtk.Widget>, Args extends Array<unknown>> = (
//     self: W,
//     ...args: Args
// ) => unknown
//
// type Component = {
//     color: string
//     iconColor: string
//     background: string
// }
//
// type MakeSomeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
//
// type BarComponent = Component & {
//     onScroll?: SigHandler<Astal.EventBox, [event: Astal.ScrollEvent]>
//     onPrimaryClick?: (...arg: any[]) => void
//     onSecondaryClick?: string
// }
//
// type Bar = Partial<Component> & {
//     appLauncher: MakeSomeRequired<BarComponent, "onScroll" | "onPrimaryClick">
//     date: BarComponent
// }
//
// interface GlobalConfig {
//     bar: Bar
// }
//
// const makeComponent = <T extends Component>(
//     component: Omit<T, keyof Component> & Partial<Component>,
//     defaultValues: Component = { color: defaultTheme.fg, iconColor: defaultTheme.fg, background: defaultTheme.bg },
// ): T => ({ ...defaultValues, ...component }) as T
//
// export const globalConfig: GlobalConfig = {
//     bar: {
//         appLauncher: makeComponent({
//             onPrimaryClick: () => exec("rofi -show drun -no-default-config -config ~/.config/rofi/full_screen.rasi"),
//             onScroll: (_, e) => {
//                 e.delta_x + e.delta_y > 0 ? exec("wpaperctl next") : exec("wpaperctk prev")
//             },
//         }),
//         date: makeComponent({ iconColor: defaultTheme.bar.date.iconColor }),
//         background: defaultTheme.bg,
//         color: defaultTheme.fg,
//     },
// }

