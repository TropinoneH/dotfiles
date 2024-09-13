function __fzf_preview_image -d "preview image for fzf"
    function check_status
        if test $status -ne 0
            echo "Error: Command failed. Exiting."
            exit 1
        end
    end

    set FIFO "/tmp/preview_fifo"

    if not test -p "$FIFO"
        mkfifo "$FIFO"
        check_status
    end

    set x (math (tput cols) / 2 + 1)
    set y 1
    set width $FZF_PREVIEW_COLUMNS
    set height $FZF_PREVIEW_LINES

    function start_ueberzugpp
        ueberzugpp layer --silent < "$FIFO" &
        check_status
        exec 3> "$FIFO"
    end

    function cleanup
        rm -f "$FIFO"
    end

    trap cleanup HUP INT QUIT TERM PWR EXIT

    function preview_image
        echo '{"path": "'"$argv[1]"'", "action": "add", "identifier": "fzfpreview", "x": "'"$x"'", "y": "'"$y"'", "width": "'"$width"'", "height": "'"$height"'"}' > "$FIFO"
        check_status
    end

    start_ueberzugpp
    preview_image "$argv[1]"

    wait
end
