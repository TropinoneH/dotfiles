import { config } from "../../config"
import { DimButton } from "../components/Button"

export default () => (
    <DimButton onClick={config.bar.powermenu.onPrimaryClick}>
        <box
            css={`
                background: ${config.theme.bar.powermenu.bg};
                padding: 0 0.5rem;
                margin-left: 0.3rem;
                margin-right: 0.5rem;
                border-radius: 0.5rem;
            `}
        >
            <label label={"⏻"} css={`color: ${config.theme.bar.powermenu.iconColor};`} />
        </box>
    </DimButton>
)
