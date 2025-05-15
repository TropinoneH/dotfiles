#!/bin/bash

# firmware
# intel gpu
sudo pacman -S --noconfirm mesa
# bluetooth
sudo pacman -S --noconfirm bluedevil
# audio
sudo pacman -S --noconfirm sof-firmware
sudo pacman -S --noconfirm pipewire wireplumber
# desktop environment
sudo pacman -S --noconfirm acpi
sudo pacman -S --noconfirm xdg-desktop-portal-hyprland xdg-desktop-portal-gtk
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
# power profile daemon
sudo pacman -S --noconfirm tuned-ppd

# software
# polkit agent
sudo pacman -S --noconfirm polkit hyprpolkitagent
# wallpaper
# sudo pacman -S --noconfirm hyprpaper
sudo pacman -S --noconfirm swaybg
# Input method
sudo pacman -S --noconfirm fcitx5 fcitx5-qt fcitx5-gtk fcitx5-chinese-addons fcitx5-nord fcitx5-configtool
# colorize
sudo pacman -S --noconfirm lolcat
# console prompt
sudo pacman -S --noconfirm starship
# better find
sudo pacman -S --noconfirm fd fzf ripgrep
# uncompress
sudo pacman -S --noconfirm unzip zip unrar ark
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
# screen shot
sudo pacman -S --noconfirm grim
# screen record
sudo pacman -S --noconfirm obs-studio
# clipboard
sudo pacman -S --noconfirm xclip
# network manager
sudo pacman -S --noconfirm iwd net-tools
# windows remote desktop(RDP)
sudo pacman -S --noconfirm freerdp2
# help message
sudo pacman -S --noconfirm tldr
# downloader
sudo pacman -S --noconfirm wget
# neovim editor
sudo pacman -S --noconfirm neovim
# npm package manager
sudo pacman -S --noconfirm npm pnpm
# web browser
sudo pacman -S --noconfirm firefox
# music player
sudo pacman -S --noconfirm ncmpcpp mpd mpd-mpris playerctl
# better cat
sudo pacman -S --noconfirm bat
# image viewer
sudo pacman -S --noconfirm imv
# code
sudo pacman -S --noconfirm go
sudo pacman -S --noconfirm rustup
sudo pacman -S --noconfirm jdk17-openjdk
sudo pacman -S --noconfirm dart-sass
# audio
sudo pacman -S --noconfirm pavucontrol-qt
# image editor
sudo pacman -S --noconfirm imagemagick
# ssh file system
sudo pacman -S --noconfirm sshfs
# shell
sudo pacman -S --noconfirm fish zsh
# calculator
sudo pacman -S --noconfirm qalculate-qt
# pdf viewer
sudo pacman -S --noconfirm tesseract-data-eng
sudo pacman -S --noconfirm zathura zathura-pdf-mupdf
# docker
sudo pacman -S --noconfirm docker
# tauri dependency
sudo pacman -S --noconfirm webkit2gtk-4.1
# game
sudo pacman -S steam

# python env
sudo pacman -S --noconfirm python-neovim
# latex
sudo pacman -S --noconfirm texlive texlive-langchinese

# font
sudo pacman -S --noconfirm ttf-jetbrains-mono-nerd otf-codenewroman-nerd adobe-source-code-pro-fonts adobe-source-han-sans-cn-fonts ttf-opensans ttf-roboto-mono-nerd otf-font-awesome ttf-meslo-nerd

# init tldr
git clone git@github.com:tldr-pages/tldr ~/.cache/tldr

# use npm
sudo npm install -g n nrm figlet prettier

# rust
export RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
export RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup
rustup run --install stable cargo
rustup default stable

cargo install cmd-wrapped
cargo install tree-sitter-cli
cargo install create-tauri-app
