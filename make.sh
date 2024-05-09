#!/bin/bash

# exit on error:
set -e

temp=_temp

rm -rf $temp
mkdir -p $temp/src

echo "Preprocessing: src/*.md -> $temp/src/*.md"
time python3 extra/preprocess.py $temp/src src/*.md
echo

echo "Running pandoc: $temp/src/*.md -> $temp/html/*.html"
time pandoc --defaults=pandoc-defaults.yaml --output=$temp/html $temp/src/*.md
echo

rm docs/html/*
echo "Postprocessing: $temp/html/*.html -> docs/html/*.html"
time python3 extra/postprocess.py docs/html $temp/html/*.html
echo

# Checking links using library: https://github.com/untitaker/hyperlink

echo "==============================================================================="
hyperlink dump-external-links docs | sort | uniq 
echo

echo "==============================================================================="
hyperlink --check-anchors docs
echo

