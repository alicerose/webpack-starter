#!/usr/bin/env bash
exe="node_modules/.bin/js-beautify"

printf "[Beautify] Start\n"

dir_path="dist/*"
dirs=`find $dir_path -maxdepth 4 -type d`
options="-r --editorconfig "

# 下層のhtmlを処理
function optimizeSubDir() {
    for dir in $dirs;
    do
      for entry in "$dir"/*.html
      do
        $exe "$entry" $options
      done
    done
}

optimizeSubDir

dirs=(\
  "dist/"
)

# ルート階層のhtmlを処理
function main() {
    for dir in ${dirs[@]}
    do
      for entry in "$dir"*.html
      do
        $exe "$entry" $options
      done
    done
}

main

printf "[Beautify] Done\n"
