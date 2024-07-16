# build from source
mkdir -p ~/Downloads/pkgs/pacman/
cd ~/Downloads/pkgs/pacman/ || exit

# use go proxy
go env -w GO111MODULE=on
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
export GOPROXY=https://mirrors.aliyun.com/goproxy/,direct

# git clone https://aur.archlinux.org/yay.git
cd yay || exit
makepkg -si
cd .. || exit

# use exa as alternative
# git clone https://aur.archlinux.org/logo-ls.git
# cd logo-ls || exit
# sed -i "s/'go'//g'" PKGBUILD
# makepkg -si
# cd .. || exit

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

git clone https://aur.archlinux.org/typora.git
cd typora || exit
sed -i "s/pkgver=[0-9]\.[0-9]\.[0-9]/pkgver=1.6.6/g" PKGBUILD
sed -i "s/sha512sums=('[0-9a-z]*'/sha512sums=('SKIP'/" PKGBUILD
makepkg -si
cd ~/Documents/go || exit
rm -rf ElectronInjector
git clone git@github.com:Yoshino-s/ElectronInjector.git
cd ElectronInjector || exit
go get
go build -o main
cd /usr/share/typora/resources/app.asar.unpacked || exit
sudo ~/Documents/go/ElectronInjector/main -i crack
cd ~/Downloads/pkgs/pacman || exit

# yay install
yay -S google-chrome mailspring notion-app-electron visual-studio-code-bin clang-format-all-git ueberzugpp cava hyprlock-git
yay -S rofi-wayland rofi-bluetooth-git networkmanager-dmenu-git rofi-greenclip
