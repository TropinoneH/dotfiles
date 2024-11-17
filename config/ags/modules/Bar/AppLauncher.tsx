import { config } from "../../config"
import { DimButton } from "../components/Button"

export default () => {
    return (
        <DimButton onScroll={config.bar.appLauncher.onScroll} onClick={config.bar.appLauncher.onPrimaryClick}>
            <box
                css={`
                    margin-left: 1rem;
                    margin-right: 0.3rem;
                    padding: 0 0.8rem;
                    border-radius: 0.5rem;
                    color: ${config.theme.bar.appLauncher.color};
                    background: ${config.theme.bar.appLauncher.bg};
                `}
            >
                <label css="font-size: 1.4rem" label="" />
            </box>
        </DimButton>
    )
}
