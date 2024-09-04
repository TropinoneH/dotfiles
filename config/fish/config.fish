if status is-interactive
    # Commands to run in interactive sessions can go here
end

# prompt
export STARSHIP_CONFIG=$HOME/.config/starship/starship.toml
starship init fish | source

# greeting message
function fish_greeting
    figlet "Hi, TropinoneH!" | lolcat
end

# disable conda default env prompt
export CONDA_CHANGEPS1=no
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
if test -f /home/TropinoneH/miniconda3/bin/conda
    eval /home/TropinoneH/miniconda3/bin/conda "shell.fish" "hook" $argv | source
else
    if test -f "/home/TropinoneH/miniconda3/etc/fish/conf.d/conda.fish"
        . "/home/TropinoneH/miniconda3/etc/fish/conf.d/conda.fish"
    else
        set -x PATH "/home/TropinoneH/miniconda3/bin" $PATH
    end
end
# <<< conda initialize <<<

