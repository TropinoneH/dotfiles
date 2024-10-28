function __fzf_preview -d "preview function for fzf"
    kitten icat --clear --stdin=no --transfer-mode=file --place $FZF_PREVIEW_COLUMNS"x"$FZF_PREVIEW_LINES"@0x0"
    if not test -f "$argv[1]"
        if not test -d "$argv[1]"
            echo $argv[1] | cut -f2
            return 0
        end
    end
    set -l mime (file -bL --mime-type "$argv[1]")
    set -l category (string split "/" $mime)[1]

    if test -d "$argv[1]"
        exa --icons --color=always --group-directories-first --tree -L 2 "$argv[1]" 2> /dev/null
    else if test "$category" = "text"
        bat -p --style numbers --color=always "$argv[1]" 2> /dev/null | head -1000
    else if test "$mime" = "application/pdf"
        pdftotext "$argv[1]" - | less
    else if test "$category" = "image"
        kitten icat --stdin=no --place $FZF_PREVIEW_COLUMNS"x"$FZF_PREVIEW_LINES"@0x0" --transfer-mode=file $argv[1]
    else
        echo "$argv[1] is a $category file"
    end
end
