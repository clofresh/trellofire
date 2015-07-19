function compile_less() {
    SRC=./less
    DEST=${1-./build/dev/css}

    mkdir -p $DEST
    rm -f $DEST/*.css
    echo "[compile_less] Compiling ${SRC}/*.less => ${DEST}/styles.css"
    lessc $SRC/*.less > $DEST/styles.css
}
