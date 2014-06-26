#!/bin/bash

# This stuff isn't necessary. In fact, I would avoid running this script as it doesn't update the
# script references in the HTML.

mkdir build
cp src/manifest.json build/manifest.json
cp -r src/css build/
cp -r src/images build/
mkdir build/js
cp src/js/background.js build/js/.
cp src/js/inject-min.js build/js/.
cp src/js/jquery-min.js build/js/.
cp src/js/jquery-ui-1.10.4.custom.min.js build/js/.
zip -r build build
