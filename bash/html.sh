function copy_html() {
    SRC=./html
    DEST=${1-./build/dev/}

    echo "[copy_html] Copying ${SRC}/*.html => ${DEST}/"
    cp html/*.html $DEST
}
