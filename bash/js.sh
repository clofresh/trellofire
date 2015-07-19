function compile_js() {
    DIR=${1-./build/dev/js}
    OPTIMIZE=${2-none}
    echo "[compile_js] Compiling js to $DIR (optimize: $OPTIMIZE)"
    r.js -o build.js dir=$DIR optimize=$OPTIMIZE
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

