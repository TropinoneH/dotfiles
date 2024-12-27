THEME.git = THEME.git or {}
THEME.git.modified_sign = ""
THEME.git.added_sign = ""
THEME.git.untracked_sign = "󰞋"
THEME.git.ignored_sign = ""
THEME.git.deleted_sign = ""
THEME.git.updated_sign = ""

THEME.git.modified = ui.Style():fg("#f9e2af")
THEME.git.added = ui.Style():fg("#a6e3a1")
THEME.git.untracked = ui.Style():fg("#89dceb")
THEME.git.ignored = ui.Style():fg("#6c7087")
THEME.git.deleted = ui.Style():fg("#f38ba8")
THEME.git.updated = ui.Style():fg("#94e2d5")

require("git"):setup()

require("starship"):setup({ config_file = "$HOME/.config/starship/yazi.toml" })
