#!/bin/bash
cp src/manifest.json build/manifest.json
cp -r src/css build/css
cp -r src/images build/images
mkdir build/js
cp src/js/background.js build/js/.
cp src/js/inject-min.js build/js/.
cp src/js/jquery-min.js build/js/.
cp src/js/jquery-ui-1.10.4.custom.min.js build/js/.
zip -r build build