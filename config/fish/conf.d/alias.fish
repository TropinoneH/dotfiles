# System command
alias ls="exa --icons=always --color=always"
alias ll="ls -alH --git"
alias cls="clear"
alias t="exa --icons=always --color=always --tree"
alias cat="bat"
alias rm="rm -i"
# apt command
alias update="sudo pacman -Syy"
alias upgrade="sudo pacman -Syyu"
alias uninstall="sudo pacman -Rs"
alias i="sudo pacman -S"
# core command
alias core="sudo uname -r"
alias neofetch="fastfetch"
alias fetch="fastfetch"
# utils
alias untar="tar -zxvf"
alias untarxz="tar -xvf"
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
