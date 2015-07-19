#!/bin/bash -e

function build() {
    ENV=${1-dev}
    # Prepare the dir
    BUILD_DIR=./build/$ENV
    echo "[build] Creating $ENV build in ${BUILD_DIR}"
    rm -rf $BUILD_DIR/*

    # Compile the peg grammars to js
    compile_peg

    # Compile and optimize the js and jsx
    EXTRA_ARGS=""
    if [ $ENV == "dev" ]
    then
        EXTRA_ARGS="optimize=none dir=$BUILD_DIR/js"
        echo "[build] dev r.js override: $EXTRA_ARGS"
    fi
    r.js -o build.js $EXTRA_ARGS

    # Compile the less to css
    compile_less $BUILD_DIR/css

    # Copy over the html
    copy_html $BUILD_DIR
}

function compile_less() {
    SRC=./less
    DEST=${1-./build/dev/css}

    mkdir -p $DEST
    rm -f $DEST/*.css
    echo "[compile_less] Compiling ${SRC}/*.less => ${DEST}/styles.css"
    lessc $SRC/*.less > $DEST/styles.css
}

function compile_peg() {
    rm -f js/peg/*.js
    for SRC in peg/*.pegjs
    do
        NAME=$(basename $SRC)
        NAME=${NAME%.pegjs}
        DEST="js/${SRC%.pegjs}.js"
        echo "[compile_peg] Compiling ${SRC} => ${DEST}"
        pegjs -e "var _${NAME}_parser" "$SRC" "$DEST"
        echo "define(function() { return _${NAME}_parser; });" >> "$DEST"
    done
}

function copy_html() {
    SRC=./html
    DEST=${1-./build/dev/}

    echo "[copy_html] Copying ${SRC}/*.html => ${DEST}/"
    cp html/*.html $DEST
}

function start_server() {
    PORT=${1-8000}
    DIR=${2-./build/dev/}

    cd $DIR
    CMD="python -m http.server $PORT"
    stop_servers $PORT
    $CMD &
    PID=$!
    echo "[start_server] Starting server in ${DIR} at port ${PORT} (pid: $PID)"
}

function stop_servers() {
    PORT=${1-8000}
    pkill -f "python -m http.server $PORT" || true
}

$@
