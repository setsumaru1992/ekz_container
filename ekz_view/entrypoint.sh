#!/usr/bin/env bash

yarn install
port=18072
yarn dev -p ${port}

#yarn build
#yarn start -p ${port}

# 通常コマンドが失敗するときにコンテナを延命させるデバッグコマンド
# tail -n 1 -f package.json > /dev/null