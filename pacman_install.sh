#!/bin/bash

# firmware
sudo pacman -S mesa pulseaudio-bluetooth bluedevil alsa-utils sof-firmware plasma-framework5 libmpdclient wezterm acpi xdg-desktop-portal-hyprland qt6ct cifs-utils gvfs gvfs-mtp gvfs-gphoto2 gvfs-smb

sudo pacman -S lolcat fd fzf ripgrep unzip lazygit cmatrix btop fastfetch exa yazi dolphin xautolock grim xclip iwd net-tools tldr wget neovide npm firefox gnome-keyring ncmpcpp mpd mpc libevent gnome-keyring bat okular brightnessctl mako feh go rustup pavucontrol-qt wlroots hypridle imagemagick

# python env
sudo pacman -S python-neovim

# font
sudo pacman -S ttf-jetbrains-mono-nerd otf-codenewroman-nerd adobe-source-code-pro-fonts adobe-source-han-sans-cn-fonts

# init tldr
git clone git@github.com:tldr-pages/tldr ~/.cache/tldr

# use npm
sudo npm install -g n nrm figlet pnpm yarn vue prettier

# rust
export RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
export RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup
rustup run --install stable cargo
rustup default stable

cargo install cmd-wrapped
cargo install tree-sitter-cli
cargo install wpaperd wpaperctl
