#!/bin/sh
export DCMDICTPATH=./dicom.dic
find . -name "*.dcm" | xargs  ./storescu -v localhost 4242
