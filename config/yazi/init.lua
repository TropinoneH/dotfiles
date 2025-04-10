th.git = th.git or {}
th.git.modified_sign = ""
th.git.added_sign = ""
th.git.untracked_sign = "󰞋"
th.git.ignored_sign = ""
th.git.deleted_sign = ""
th.git.updated_sign = ""

th.git.modified = ui.Style():fg("#f9e2af")
th.git.added = ui.Style():fg("#a6e3a1")
th.git.untracked = ui.Style():fg("#89dceb")
th.git.ignored = ui.Style():fg("#6c7087")
th.git.deleted = ui.Style():fg("#f38ba8")
th.git.updated = ui.Style():fg("#94e2d5")

require("git"):setup()

require("starship"):setup({ config_file = "$HOME/.config/starship/yazi.toml" })
