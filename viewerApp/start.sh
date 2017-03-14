#!/bin/sh
cd ./OHIFViewer
meteor npm install
METEOR_PACKAGE_DIRS="../Packages" meteor --port 3030 --settings ../config/orthancDICOMWeb.json
