import { Gtk } from "astal/gtk3"
import { config } from "../../config"
import { bind, Variable } from "astal"
import AstalPowerProfiles from "gi://AstalPowerProfiles"
import { PointerButton } from "../components/Button"
import PopWindow from "../components/PopWindow"

const PowerProfiles = AstalPowerProfiles.get_default()

const theme = config.theme.dropMenu

const iconSet: Record<AstalPowerProfiles.Profile["profile"], string> = {
    balanced: "power-profile-balanced-symbolic",
    "power-saver": "power-profile-power-saver-symbolic",
    performance: "power-profile-performance-symbolic"
}

const uptime = Variable(0).poll(6000, "cat /proc/uptime", (line) => Number.parseInt(line.split(".")[0]) / 60)

export default () => (
    <PopWindow name="battery-menu" transition={Gtk.RevealerTransitionType.SLIDE_DOWN}>
        <box
            halign={Gtk.Align.FILL}
            hexpand
            vertical
            css={`
                padding: 0.5rem;
                border-radius: 0.5rem;
                background-color: ${theme.bg};
                color: ${theme.fg};
                min-width: 20rem;
            `}
            onDestroy={() => uptime.drop()}
        >
            <box>
                <label label="Power Profile" halign={Gtk.Align.START} hexpand css="font-size: 1.5rem;" />
                <label
                    label={bind(uptime).as((t) => `: ${Math.floor(t / (60 * 24))}d ${Math.floor((t % (60 * 24)) / 60)}h ${Math.floor(t % 60)}m`)}
                    css="font-size: 0.8rem;"
                    tooltipText="Uptime"
                />
            </box>
            <box valign={Gtk.Align.FILL} vexpand vertical>
                {PowerProfiles.get_profiles().map((profile) => (
                    <PointerButton
                        css={bind(PowerProfiles, "activeProfile").as((ap) =>
                            ap === profile.profile ? `color: ${theme.active}; margin: 0.2rem; font-weight: bold;` : `color: ${theme.fg}; margin: 0.2rem;`
                        )}
                        onClick={(_, e) => {
                            if (e.button === 1) PowerProfiles.activeProfile = profile.profile
                        }}
                    >
                        <box tooltipText={`platform driver: ${profile.platform_driver}\ncpu driver: ${profile.cpu_driver}\ndriver: ${profile.driver}`}>
                            <icon icon={iconSet[profile.profile] || iconSet.balanced} css="margin-right: 0.5rem;" />
                            <label label={profile.profile} />
                        </box>
                    </PointerButton>
                ))}
            </box>
        </box>
    </PopWindow>
)
