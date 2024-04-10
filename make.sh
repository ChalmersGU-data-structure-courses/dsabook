#!/bin/bash

SOURCES=(src/*.md)
OUT=docs/html

rm -rf $OUT
echo "Running pandoc"
time pandoc --defaults=pandoc-defaults.yaml --output=$OUT "${SOURCES[@]}"
echo

echo "Postprocessing output"
time python postprocess.py
echo

# Checking links using library: https://github.com/untitaker/hyperlink

echo "==============================================================================="
hyperlink dump-external-links docs | sort | uniq 
echo

echo "==============================================================================="
hyperlink --check-anchors docs
echo

