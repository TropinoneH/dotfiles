const Audio = await Service.import("audio")

const getSpeakerIcon = (
    /**@type{String | undefined | null}*/ streamIcon,
    /**@type{number | undefined | null}*/ volume = null,
) => {
    const iconSet = userConfigs.bar.icons.audio.speaker
    if (Audio.speaker.stream?.is_muted) return iconSet.mute
    if (!streamIcon) return "err"
    let iconName = "default"
    for (const key in iconSet) {
        if (streamIcon.includes(key)) {
            iconName = key
            break
        }
    }
    let icon = iconSet[iconName]
    if (iconName === "default") {
        volume = volume ?? 0
        volume *= 100
        const count = iconSet.default.length
        const threshold = 100 / count
        for (let i = 0; i < count; i++)
            if (volume < threshold * (i + 1)) {
                icon = iconSet.default[i]
                break
            }
    }
    return icon
}

const getInputIcon = (/**@type{number | undefined | null}*/ volume = null) => {
    if (Audio.microphone.is_muted) return "microphone-sensitivity-muted-symbolic"
    volume = volume ?? 0
    volume *= 100

    const inputIcons = userConfigs.bar.icons.audio.microphone

    if (volume === 0) return inputIcons[0]
    else if (0 < volume && volume < 34) return inputIcons[1]
    else if (33 < volume && volume < 67) return inputIcons[2]
    else if (66 < volume && volume < 101) return inputIcons[3]
    else if (volume >= 101) return inputIcons[4]
}

export const getAudioIcon = (
    /**@type{String | undefined | null}*/ streamIcon,
    /**@type{"speaker" | "microphone"}*/ type = "speaker",
    /**@type{number | undefined | null}*/ volume = null,
) => (type === "speaker" ? getSpeakerIcon(streamIcon, volume) : getInputIcon(volume))

export const getNetworkIcon = (/**@type{String}*/ iconName) => {
    const deviceIconMap = userConfigs.bar.icons.network.wifi
    const foundMatch = deviceIconMap.find((icon) => RegExp(icon[0]).test(iconName.toLowerCase()))
    return foundMatch ? foundMatch[1] : "󰤨"
}

export const getBluetoothIcon = (/**@type{String}*/ iconName) => {
    const deviceIconMap = [
        ["^audio-card*", "󰎄"],
        ["^audio-headphones*", "󰋋"],
        ["^audio-headset*", "󰋎"],
        ["^audio-input*", "󰍬"],
        ["^audio-speakers*", "󰓃"],
        ["^bluetooth*", "󰂯"],
        ["^camera*", "󰄀"],
        ["^computer*", "󰟀"],
        ["^input-gaming*", "󰍬"],
        ["^input-keyboard*", "󰌌"],
        ["^input-mouse*", "󰍽"],
        ["^input-tablet*", "󰓶"],
        ["^media*", "󱛟"],
        ["^modem*", "󱂇"],
        ["^network*", "󱂇"],
        ["^phone*", "󰄞"],
        ["^printer*", "󰐪"],
        ["^scanner*", "󰚫"],
        ["^video-camera*", "󰕧"],
    ]
    const foundMatch = deviceIconMap.find((icon) => RegExp(icon[0]).test(iconName.toLowerCase()))
    return foundMatch ? foundMatch[1] : "󰂯"
}
