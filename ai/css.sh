#!/bin/bash

srcDir="../src"
model="claude-3.5-sonnet"
prompt="Please use the html files to create a purely css styling \
(no javascript at all) that is responsive, accessible, minimalist, \
grayscale, and conveys the contents of the html files. \
If needed, please also suggest any modification necessary to the html \
code. Return the full CSS file but just advice for the html code modifs."


files-to-prompt $srcDir -c -e html | llm -m $model -s "$prompt"