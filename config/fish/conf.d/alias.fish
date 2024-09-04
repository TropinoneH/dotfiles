# System command
alias ls="exa --icons=always --color=always"
alias ll="ls -alH --git"
alias cls="clear"
alias t="exa --icons=always --color=always --tree"
alias sudo="sudo "
alias cat="bat"
# apt command
alias update="sudo pacman -Syy"
alias upgrade="sudo pacman -Syyu"
alias uninstall="sudo pacman -Rs"
alias i="sudo pacman -S"
# core command
alias cpu="sudo dmidecode -t 4 | grep ID"
alias serial="sudo dmidecode -t 2 | grep Serial"
alias mac="sudo lshw -c network | grep serial | head -n 1"
alias core="sudo uname -r"
alias neofetch="fastfetch"
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
