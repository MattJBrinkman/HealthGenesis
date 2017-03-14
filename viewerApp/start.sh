#!/bin/sh
cd ./OHIFViewer
METEOR_PACKAGE_DIRS="../Packages" meteor --port 3030 --settings ../config/orthancDICOMWeb.json
