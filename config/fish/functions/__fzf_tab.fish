function __fzfcmd
    set -l color --color=fg:#d0d0d0,fg+:#d0d0d0,bg:#121212,bg+:#262626
    set -l hl --color=hl:#5f87af,hl+:#60f0d1,info:#afaf87,marker:#87ff00
    set -l prompt_color --color=prompt:#00d6cf,spinner:#2fcfdd,pointer:#5e9cff,header:#f0df6e
    set -l layout_color --color=border:#5d5d5d,separator:#aac6ae,preview-fg:#c8c8c8,preview-bg:#282828
    set -l preview_color --color=preview-border:#d4d4d4,label:#aeaeae,query:#c8c8c8
    set -l border --border=rounded --border-label= --preview-window=border-rounded --padding=1
    set -l prompt --prompt= --marker=┃ --pointer=» --separator==
    set -l layout --scrollbar= --no-hscroll --layout=reverse --height=40% --tmux=40%
    set -l preview "--preview=\"__fzf_preview {}\""
    echo fzf "-q (commandline -t)" $color $hl $prompt_color $layout_color $preview_color $border $prompt $layout $preview
end

function __fzf_tab -d 'fzf completion and print selection back to commandline'
    set -l cmd (commandline -co) (commandline -ct)
    switch $cmd[1]
    case env sudo
        for i in (seq 2 (count $cmd))
            switch $cmd[$i]
            case '-*'
            case '*=*'
            case '*'
                set cmd $cmd[$i..-1]
                break
            end
        end
    end
    set cmd (string join -- ' ' $cmd)

    set -l complist (complete -C$cmd)

    set -l result
    # TODO::把fzf显示的内容和可搜索的内容去掉description
    string join -- \n $complist | sort -u | eval (__fzfcmd) --delimiter "\t" --with-nth=1 -m --select-1 --exit-0 --header '(commandline)' | cut -f1 | while read -l r; set result $result $r; end

    set prefix (string sub -s 1 -l 1 -- (commandline -t))
    for i in (seq (count $result))
        set -l r $result[$i]
        switch $prefix
        case "'"
            commandline -t -- (string escape -- $r)
        case '"'
            if string match '*"*' -- $r >/dev/null
                commandline -t --  (string escape -- $r)
            else
                commandline -t -- '"'$r'"'
            end
        case '~'
            commandline -t -- (string sub -s 2 (string escape -n -- $r))
        case '*'
            commandline -t -- (string escape -n -- $r)
        end
        [ $i -lt (count $result) ]; and commandline -i ' '
    end

    commandline -f repaint
end
