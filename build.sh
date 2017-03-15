#!/bin/bash
function buildApp {
  pushd $1
  echo "Building $1"
  npm install
  meteor build --directory /tmp/$1/build
  popd
}

declare -a apps=("authProxy" "phrApp" "shareApp")
for app in "${apps[@]}"
do
  buildApp $app
done

pushd viewerApp/OHIFViewer
echo "Building viewer"
npm install
METEOR_PACKAGE_DIRS="../Packages"
meteor build --directory /tmp/viewerApp/build
popd 
