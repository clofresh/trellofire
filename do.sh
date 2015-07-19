#!/bin/bash -e

for f in bash/*.sh
do
    source "$f"
done

$@
