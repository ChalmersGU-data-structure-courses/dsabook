#!/bin/bash

# exit on error:
set -e

temp=_temp

rm -rf $temp
mkdir -p $temp/src

echo "Preprocessing: src/* -> $temp/src/*"
time python3 extra/preprocess.py $temp/src src/X01-glossary.md src/*.md
# Copy non-markdown files and folders:
cp -Rn src/ $temp/src/ || true
echo

echo "Running pandoc: $temp/src/* -> $temp/html/*"
time pandoc -t chunkedhtml --defaults=pandoc-defaults.yaml --output=$temp/html $temp/src/*.md
echo

rm -rf docs/html/*
echo "Postprocessing: $temp/html/* -> docs/html/*"
time python3 extra/postprocess.py docs/html $temp/html/*.html
# Copy non-html files and folders:
cp -Rn $temp/html/ docs/html || true
echo

# Checking links using library: https://github.com/untitaker/hyperlink

echo "==============================================================================="
hyperlink dump-external-links docs | sort | uniq 
echo

echo "==============================================================================="
hyperlink --check-anchors docs
echo

