#!/bin/bash

cwd=$HOME/dotfiles
echo $cwd
for file in $cwd/config/*; do
    ln -sf "$file" $HOME/.config/$(basename $file)
done

ln -sf $cwd/zsh $HOME/.zsh
ln -sf $cwd/zshrc $HOME/.zshrc
sudo ln -sf $cwd/profile /etc/profile.d/env_path.sh
ln -sf $cwd/p10k.zsh $HOME/.p10k.zsh

for file in $cwd/desktop/*; do
    sudo ln -sf $file /usr/share/applications/$(basename $file)
done

sudo cp $cwd/fonts/* /usr/share/fonts/

mkdir -p ~/.config/mpd/playlists

gsettings set org.gnome.desktop.interface color-scheme "prefer-dark"
gsettings set org.gnome.desktop.interface gtk-theme "Orchis-Dark"
gsettings set org.gnome.desktop.interface cursor-theme "Bibata-Modern-Ice"
gsettings set org.gnome.desktop.interface icon-theme "Tela-dark"

# time
timedatectl set-local-rtc true
sudo hwclock -s

# bat theme
bat cache --build
