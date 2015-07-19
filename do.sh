#!/bin/bash -e

for f in bash/*.sh
do
    source "$f"
done

if [ $# == 0 ]
then
    build
else
    $@
fi
