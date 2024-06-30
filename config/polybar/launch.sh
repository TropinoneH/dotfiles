#!/bin/bash

# Terminate already running bar instances
killall -q polybar

# Wait until the processes have been shut down
while pgrep -u $UID -x polybar > /dev/null; do sleep 1; done

if type "xrandr"; then
    # for m in $(xrandr --query | rg " connected" | cut -d" " -f1); do
    for m in $(polybar --list-all-monitors | cut -d":" -f1); do
        MONITOR=$m polybar main --config=~/.config/polybar/config.ini &
        # MONITOR=$m polybar second --config=~/.config/polybar/config.ini &
    done
else
    # Launch Polybar, using default config location ~/.config/polybar/config
    polybar main --config=~/.config/polybar/config.ini &
    # polybar second --config=~/.config/polybar/config.ini &
fi

echo "Polybar launched..."
