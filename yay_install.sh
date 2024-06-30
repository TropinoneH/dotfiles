# build from source
mkdir -p ~/Downloads/pkgs/pacman/
cd ~/Downloads/pkgs/pacman/ || exit

# use go proxy
go env -w GO111MODULE=on
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
export GOPROXY=https://mirrors.aliyun.com/goproxy/,direct

git clone https://aur.archlinux.org/yay.git
cd yay || exit
sed -i "s/makedepends=\('go>=1.21'\)//g" PKGBUILD
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
# cp ~/Downloads/pkgs/office/sogoupinyin_4.2.1.145_amd64.deb ./
sed -i "s/sha256sum=*/sha256sun('SKIP')/g" PKGBUILD
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
sed -i "s/pkgver=[0-9]\.[0-9]\.[0-9]_[0-9]\{5\}/pkgver=3.2.2_18394/g" PKGBUILD
sed -i "s/_pkgver_loong64=[0-9]\.[0-9]\.[0-9]_[0-9]\{5\}/_pkgver_loong64=3.2.2_18394/g" PKGBUILD
makepkg -si
cd .. || exit

git clone https://aur.archlinux.org/typora.git
cd typora || exit
sed -i "s/pkgver=[0-9]\.[0-9]\.[0-9]/1.6.6/g"
makepkg -si
cd ~/Documents/go || exit
git clone git@github.com:Yoshino-s/ElectronInjector.git
go get
go build -o main
cd /usr/share/typora/resources/app.asar.unpacked || exit
sudo ~/Documents/go/ElectronInjector/main -i crack
cd ~/Downloads/pkgs/pacman || exit

# yay install
yay -S google-chrome optimus-manager optimus-manager-qt networkmanager-dmenu-git rofi-bluetooth-git mailspring rofi-greenclip notion-app-electron todesk visual-studio-code-bin

sudo pacman -Rs i3lock
yay -S i3lock-color
