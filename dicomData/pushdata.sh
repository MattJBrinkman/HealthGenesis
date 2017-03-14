#!/bin/sh
export DCMDICTPATH=./dicom.dic
find . -name "*.dcm" | xargs  ./storescu -v pacsemulator.cloudapp.net 4242
