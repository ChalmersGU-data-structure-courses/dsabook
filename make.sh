#!/bin/bash

# exit on error:
set -e

temp=_temp
glossary=src/X-appendix/01-glossary.md

rm -rf $temp
mkdir -p $temp/src

echo "Preprocessing: src/*/* -> $temp/src/*"
time python3 extra/preprocess.py $temp/src $glossary src/*/*.md
echo

echo "Running pandoc: $temp/src/* -> $temp/html/*"
time pandoc --defaults=pandoc-defaults.yaml --output=$temp/html $temp/src/*.md
echo

rm -rf docs/html/*
echo "Postprocessing: $temp/html/* -> docs/html/*"
time python3 extra/postprocess.py docs/html $temp/html/*.html
# Copy non-html files and folders:
cp -Rn $temp/html/ docs/html || true
echo

# Checking links using library: https://github.com/untitaker/hyperlink

echo "==============================================================================="
hyperlink dump-external-links --base-path docs | sort | uniq
echo

echo "==============================================================================="
hyperlink --check-anchors docs
echo

