# rust
export CARGO_HOME="$HOME/.cargo"
# Qt
export QT_PLUGIN_PATH=/usr/lib/qt6/plugins:/usr/lib/qt/plugins:$QT_PLUGIN_PATH
export QML2_IMPORT_PATH=/usr/lib/qt6/qml:/usr/lib/qt/qml:$QML2_IMPORT_PATH
# go
export GOROOT=/usr/lib/go
# dotnet
export DOTNET_PATH=$HOME/.dotnet
# PATH
export PATH=$CARGO_HOME/bin:$GOROOT/bin:$DOTNET_PATH:$PATH
# term: same as wezterm
export TERM=xterm-kitty
# library
export LD_LIBRARY_PATH=/usr/include:/usr/lib:/usr/lib64:/usr/local/lib:$LD_LIBRARY_PATH
