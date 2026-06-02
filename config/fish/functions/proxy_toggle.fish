function proxy_on
    set server "127.0.0.1"
    set port "7890"
    if test (count $argv) -ge 1
        set server $argv[1]
    end
    if test (count $argv) -ge 2
        set port $argv[2]
    end

    set proxy_url http://$server:$port

    set -gx http_proxy $proxy_url
    set -gx https_proxy $proxy_url
    echo -e "Setting proxy to: \033[0;32m$proxy_url\033[0m"
    echo -e "✅ Proxy is now \033[0;32mON\033[0m for this shell session."
end

function proxy_off
    set -e http_proxy
    set -e https_proxy
    echo -e "✅ Proxy has been turned \033[0;31mOFF\033[0m for this shell session."
end

function proxy_toggle
    set server "127.0.0.1"
    set port "7890"
    if test (count $argv) -ge 1
        set server $argv[1]
    end
    if test (count $argv) -ge 2
        set port $argv[2]
    end
    if set -q http_proxy; and set -q https_proxy
        echo -e "\033[0;33mProxy is currently ON. Turning it OFF...\033[0m"
        proxy_off
    else
        echo -e "\033[0;33mProxy is currently OFF. Turning it ON...\033[0m"
        proxy_on $server $port
    end
end