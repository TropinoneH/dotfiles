#!/bin/bash

# firmware
sudo pacman -S mesa pulseaudio-bluetooth bluedevil alsa-utils sof-firmware plasma-framework5 libmpdclient wezterm bbswitch acpi

sudo pacman -S lolcat fd fzf ripgrep tree unzip lazygit cmatrix btop fastfetch exa yazi dolphin xautolock flameshot arandr xclip iwd net-tools tldr wget neovide npm firefox gnome-keyring ncmpcpp mpd mpc libevent gnome-keyring bat okular brightnessctl mako feh go rust pavucontrol-qt

# font
sudo pacman -S ttf-jetbrains-mono-nerd otf-codenewroman-nerd adobe-source-code-pro-fonts adobe-source-han-sans-cn-fonts

# init tldr
git clone git@github.com:tldr-pages/tldr ~/.cache/tldr

# use npm
sudo npm install -g n nrm figlet pnpm yarn vue prettier
