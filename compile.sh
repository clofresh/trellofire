#!/bin/bash -e

for src in peg/*.pegjs
do
    dest="www/js/${src%.pegjs}.js"
    pegjs -e "var _parser" "$src" "$dest"
    echo "define(function() { return _parser; });" >> "$dest"
done
lessc less/*.less > www/css/styles.css
