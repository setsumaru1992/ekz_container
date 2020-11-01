#!/usr/bin/env bash

yarn install
# yarn build
yarn start &

# 通常コマンドが失敗するときにコンテナを延命させるデバッグコマンド
tail -n 1 -f package.json