# my AppFolder
AppFolder="/usr/local/applications"
# jetbrains command
alias pycharm="$AppFolder/jetbrains/pycharm/bin/pycharm.sh"
alias clion="$AppFolder/jetbrains/clion/bin/clion.sh"
alias webstorm="$AppFolder/jetbrains/webstorm/bin/webstorm.sh"
alias intellij="$AppFolder/jetbrains/intellij/bin/intellij.sh"
alias goland="$AppFolder/jetbrains/goland/bin/goland.sh"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

source $HOME/.zsh/load-config.zsh

# Welcome message
figlet "Hi, Tropinone!" | lolcat

# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
# <<< conda initialize <<<
if [ -f "/home/TropinoneH/miniconda3/etc/profile.d/conda.sh" ]; then
    . "/home/TropinoneH/miniconda3/etc/profile.d/conda.sh"
else
    export PATH="/home/TropinoneH/miniconda3/bin:$PATH"
fi
