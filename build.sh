#!/bin/bash
function buildApp {
  pushd $1
  echo "Building $1"
  npm install
  meteor build --directory /tmp/$1/build
  popd
}

declare -a apps=("authProxy" "phrApp" "shareApp" "viewerApp")
for app in "${apps[@]}"
do
  buildApp $app
done
