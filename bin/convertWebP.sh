#!/bin/sh
cd src/images || exit
Files=$(find . -type f -iname '*'.jpg -o -iname '*'.jpeg -o -iname '*'.png)
printf "[WebP Convert] Start\n"
printf "Convert targets:\n"
printf  "$Files\n"
printf "\n----------------\n"
for File in $Files
do
    echo $File
#    FILE_DIRE="${File%/*}"/
#    FILE_NAME=$(basename ${File%.*})
#    FILE_PATH=$FILE_DIRE$FILE_NAME
    cwebp -preset photo -metadata icc -sharp_yuv -o $File".webp" -progress -short $File
    printf "\n----------------\n"
done
printf "[WebP Convert] Done"
