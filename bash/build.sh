function build() {
    ENV=${1-dev}
    # Prepare the dir
    BUILD_DIR=./build/$ENV
    echo "[build] Creating $ENV build in ${BUILD_DIR}"
    rm -rf $BUILD_DIR/*

    # Compile the peg grammars to js
    compile_peg

    # Compile and optimize the js and jsx
    if [ $ENV == "release" ]
    then
        OPTIMIZE=uglify2
    else
        OPTIMIZE=none
    fi
    compile_js $BUILD_DIR/js $OPTIMIZE

    # Compile the less to css
    compile_less $BUILD_DIR/css

    # Copy over the html
    copy_html $BUILD_DIR
}
