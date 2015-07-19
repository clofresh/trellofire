function start_server() {
    PORT=${1-8000}
    DIR=${2-./build/dev/}

    cd $DIR
    CMD="python -m http.server $PORT"
    stop_server $PORT
    $CMD &
    PID=$!
    echo "[start_server] Starting server in ${DIR} at port ${PORT} (pid: $PID)"
}

function stop_server() {
    PORT=${1-8000}
    pkill -f "python -m http.server $PORT" || true
}
