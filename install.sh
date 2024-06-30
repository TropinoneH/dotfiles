#!/bin/bash

cwd=$(dirname "$0")
for file in $cwd/config/*; do
    ln -s "$file" $HOME/.config/$(basename $file)
done

ln -s $cwd/zsh $HOME/.zsh
ln -s $cwd/zshrc $HOME/.zshrc
ln -s $cwd/xprofile $HOME/.xprofile
ln -s $cwd/p10k.zsh $HOME/.p10k.zsh

for file in $cwd/desktop/*; do
    sudo ln -s $file /usr/share/applications/$(basename $file)
done

sudo ln -s $cwd/eduroam.8021x /var/lib/iwd/eduroam.8021x
