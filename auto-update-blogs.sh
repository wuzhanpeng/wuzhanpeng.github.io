#!/bin/bash
[ x$1 != x ] || { echo "[ERROR] Commit message is required"; exit; }
git add --all
git commit -m "$1"
git push -u origin master
