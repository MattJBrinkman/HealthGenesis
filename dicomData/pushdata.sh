#!/bin/sh
find . -name "*.dcm" | xargs storescu -v localhost 4242
