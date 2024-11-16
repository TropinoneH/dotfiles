import { config } from "../../config"

export default () => {
    return (
        <box
            css={`
                margin-left: 1rem;
                padding: 0 0.8rem;
                border-radius: 0.5rem;
                color: ${config.theme.bar.appLauncher.color};
                background: ${config.theme.bar.appLauncher.bg};
            `}
        >
            <eventbox onScroll={config.bar.appLauncher.onScroll} onClick={config.bar.appLauncher.onPrimaryClick}>
                <label css="font-size: 1.4rem" label="" />
            </eventbox>
        </box>
    )
}
