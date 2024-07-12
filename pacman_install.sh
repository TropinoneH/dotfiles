#!/bin/bash

# firmware
sudo pacman -S nvidia mesa pulseaudio-bluetooth bluedevil alsa-utils sof-firmware plasma-framework5 libmpdclient wezterm bbswitch acpi

sudo pacman -S lolcat fd fzf ripgrep tree unzip lazygit cmatrix btop fastfetch exa ranger dolphin dunst xautolock flameshot arandr lxappearance xclip iwd net-tools tldr wget neovide npm firefox gnome-keyring ncmpcpp mpd mpc libevent gnome-keyring bat okular

# init tldr
git clone git@github.com:tldr-pages/tldr ~/.cache/tldr

# use npm
sudo npm install -g n nrm figlet pnpm yarn vue prettier
