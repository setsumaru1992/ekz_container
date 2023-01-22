#!/usr/bin/env bash

yarn install
port=3000

if [ $NODE_ENV = "production" ]; then
    yarn build
    yarn start:prod

    # tail -n 1 -f package.json > /dev/null # デバッグ
else
    yarn start:dev
fi

# 通常コマンドが失敗するときにコンテナを延命させるデバッグコマンド
# tail -n 1 -f package.json > /dev/null