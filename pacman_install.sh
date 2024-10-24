#!/bin/bash

# firmware
# intel gpu
sudo pacman -S --noconfirm mesa
# bluetooth
sudo pacman -S --noconfirm bluedevil
# audio
sudo pacman -S --noconfirm alsa-utils
# bluetooth audio
sudo pacman -S --noconfirm pulseaudio-bluetooth
#
sudo pacman -S --noconfirm sof-firmware
# desktop environment
sudo pacman -S --noconfirm plasma-framework5
sudo pacman -S --noconfirm acpi
sudo pacman -S --noconfirm xdg-desktop-portal-hyprland
# qt style
sudo pacman -S --noconfirm qt6ct
# nas smb file system utils
sudo pacman -S --noconfirm cifs-utils
# file system drivers
sudo pacman -S --noconfirm gvfs gvfs-mtp gvfs-gphoto2 gvfs-smb
# keyring
sudo pacman -S --noconfirm libevent gnome-keyring
# compositor
sudo pacman -S --noconfirm wlroots
# brightness control
sudo pacman -S --noconfirm brightnessctl
# man page
sudo pacman -S --noconfirm man-db
# gnome control center
sudo pacman -S --noconfirm gnome-control-center

# software
# colorize
sudo pacman -S --noconfirm lolcat
# better find
sudo pacman -S --noconfirm fd fzf ripgrep
# uncompress
sudo pacman -S --noconfirm unzip unrar ark
# git gui
sudo pacman -S --noconfirm lazygit
# toys
sudo pacman -S --noconfirm cmatrix
# system monitor
sudo pacman -S --noconfirm btop
# fetch
sudo pacman -S --noconfirm fastfetch
# better ls
sudo pacman -S --noconfirm exa
# terminal file manager
sudo pacman -S --noconfirm yazi
# gui file manager
sudo pacman -S --noconfirm nautilus
# auto lock
sudo pacman -S --noconfirm xautolock
# screen shot
sudo pacman -S --noconfirm grim
# clipboard
sudo pacman -S --noconfirm xclip
# network manager
sudo pacman -S --noconfirm iwd net-tools
# help message
sudo pacman -S --noconfirm tldr
# downloader
sudo pacman -S --noconfirm wget
# neovim editor
sudo pacman -S --noconfirm neovim neovide
# npm package manager
sudo pacman -S --noconfirm npm pnpm
# web browser
sudo pacman -S --noconfirm firefox
# music player
sudo pacman -S --noconfirm libmpdclient
sudo pacman -S --noconfirm ncmpcpp mpd mpc
# better cat
sudo pacman -S --noconfirm bat
# pdf viewer
sudo pacman -S --noconfirm okular
# notification
sudo pacman -S --noconfirm mako
# image viewer
sudo pacman -S --noconfirm feh
# code
sudo pacman -S --noconfirm go
sudo pacman -S --noconfirm rustup
sudo pacman -S --noconfirm jdk8-openjdk jdk17-openjdk
sudo pacman -S --noconfirm dart-sass
# audio
sudo pacman -S --noconfirm pavucontrol-qt
# image editor
sudo pacman -S --noconfirm imagemagick
# ssh file system
sudo pacman -S --noconfirm sshfs
# shell
sudo pacman -S --noconfirm fish
# calculator
sudo pacman -S --noconfirm qalculate-qt
# docker
sudo pacman -S --noconfirm docker

# python env
sudo pacman -S --noconfirm python-neovim
# latex
sudo pacman -S --noconfirm texlive texlive-langchinese

# font
sudo pacman -S --noconfirm ttf-jetbrains-mono-nerd otf-codenewroman-nerd adobe-source-code-pro-fonts adobe-source-han-sans-cn-fonts

# init tldr
git clone git@github.com:tldr-pages/tldr ~/.cache/tldr

# use npm
sudo npm install -g n nrm figlet yarn vue prettier

# rust
export RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
export RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup
rustup run --install stable cargo
rustup default stable

cargo install cmd-wrapped
cargo install tree-sitter-cli
cargo install wpaperd wpaperctl
