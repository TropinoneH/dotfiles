function exit_or_kill_line
    if test -n (commandline)
        commandline ""
        commandline -f repaint
    else
        exit
    end
end

bind -e \cd
bind \cd exit_or_kill_line

bind "" self-insert