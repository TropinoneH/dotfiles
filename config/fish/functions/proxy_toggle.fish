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
    echo "终端代理已开启。"
end

function proxy_off
    set -e http_proxy
    set -e https_proxy
    echo "终端代理已关闭。"
end

function proxy_toggle
    if set -q http_proxy; and set -q https_proxy
        proxy_off
    else
        proxy_on
    end
end
