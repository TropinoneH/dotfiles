#!/bin/bash

cwd=$HOME/dotfiles
echo $cwd
for file in $cwd/config/*; do
    ln -sf "$file" $HOME/.config/$(basename $file)
done

ln -sf $cwd/zsh $HOME/.zsh
ln -sf $cwd/zshrc $HOME/.zshrc
ln -sf $cwd/xprofile $HOME/.xprofile
ln -sf $cwd/p10k.zsh $HOME/.p10k.zsh

for file in $cwd/desktop/*; do
    sudo ln -sf $file /usr/share/applications/$(basename $file)
done

sudo ln -sf $cwd/eduroam.8021x /var/lib/iwd/eduroam.8021x

sudo cp $cwd/fonts/* /usr/share/fonts/
sudo cp $cwd/nord-theme /usr/share/themes/

ln -sf $cwd/Xresources ~/.Xresources
