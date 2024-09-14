# build from source
mkdir -p ~/Downloads/pkgs/pacman/
cd ~/Downloads/pkgs/pacman/ || exit

# use go proxy
go env -w GO111MODULE=on
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
export GOPROXY=https://mirrors.aliyun.com/goproxy/,direct

git clone https://aur.archlinux.org/paru.git
cd paru || exit
makepkg -si
cd .. || exit

git clone https://aur.archlinux.org/fcitx-sogoupinyin.git
cd fcitx-sogoupinyin || exit
# curl -O https://ime-sec.gtimg.com/202407031906/962cda7d3d5a49ce5910c83f5c326ea2/pc/dl/gzindex/1680521603/sogoupinyin_4.2.1.145_amd64.deb
makepkg -si
sudo pacman -S fcitx-configtool
echo "GTK_IM_MODULE=fcitx" | sudo tee -a /etc/environment
echo "QT_IM_MODULE=fcitx" | sudo tee -a /etc/environment
echo "XMODIFIERS=@im=fcitx" | sudo tee -a /etc/environment
echo "SDL_IM_MODULE=fcitx" | sudo tee -a /etc/environment
echo "GLFW_IM_MODULE=ibus" | sudo tee -a /etc/environment
cd .. || exit

git clone https://aur.archlinux.org/linuxqq.git
cd linuxqq || exit
git checkout 0ba2ff0
makepkg -si
cd .. || exit

paru -S typora
cd ~/Documents/go || exit
rm -rf ElectronInjector
git clone git@github.com:Yoshino-s/ElectronInjector.git
cd ElectronInjector || exit
go get
go build -o main
cd /usr/share/typora/resources/app.asar.unpacked || exit
sudo ~/Documents/go/ElectronInjector/main -i crack
cd ~/Downloads/pkgs/pacman || exit

# firmware
paru -S --noconfirm upd72020x-fw
# web browser
paru -S --noconfirm google-chrome
# latex
paru -S miktex-git
# color picker
paru -S --noconfirm hyprpicker
# email client
paru -S --noconfirm mailspring
# notion: note and collaboration
paru -S --noconfirm notion-app-electron
# IDE
paru -S --noconfirm visual-studio-code-bin
# code formatter
paru -S --noconfirm clang-format-all-git
# image protocol
paru -S --noconfirm ueberzugpp
# music wave visualizer
paru -S --noconfirm cava
# screen recorder
paru -S --noconfirm slurp-git
# wechat
paru -S --noconfirm wechat-universal-bwrap
# music player
paru -S --noconfirm yesplaymusic
# office
paru -S --noconfirm onlyoffice-bin
# wlogout
paru -S --noconfirm wlogout-git
# rofi
paru -S --noconfirm rofi-wayland
paru -S --noconfirm rofi-bluetooth-git
paru -S --noconfirm networkmanager-dmenu-git
paru -S --noconfirm rofi-greenclip

# fish plugin manager
paru -S --noconfirm fisher
fisher install jethrokuan/z
