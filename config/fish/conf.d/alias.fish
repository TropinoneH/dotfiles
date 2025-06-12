# System command
alias ls="eza --group-directories-first --icons=always --color=always"
alias ll="eza --group-directories-first --icons=always --color=always -alH --git"
alias cls="/bin/clear"
alias t="exa --group-directories-first --icons=always --color=always --tree"
alias cat="bat"
alias rm="rm -i"
# core command
alias core="sudo uname -r"
alias fetch="fastfetch"
# utils
alias untar="tar -zxvf"
alias untarxz="tar -xvf"
alias vim="nvim"
# directory
abbr ... --position anywhere '../..'
abbr .... --position anywhere '../../..'
abbr ..... --position anywhere '../../../..'
abbr ...... --position anywhere '../../../../..'
# git
alias lg="lazygit"
alias gc="git clone --recursive"
alias gcm="git commit -m"
alias gl="git log --oneline"
alias gp="git push"
alias gpl="git pull"
alias gaa="git add ."
alias gfx="git commit --fixup"
alias gi="git init"
alias gb="git branch"
alias gs="git status"
