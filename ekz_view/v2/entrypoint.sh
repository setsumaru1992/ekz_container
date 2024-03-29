#!/usr/bin/env bash

yarn install
port=18072

if [ $NODE_ENV = "production" ]; then
    yarn build
    yarn start -p ${port}

    # tail -n 1 -f package.json > /dev/null # デバッグ
else
    yarn dev -p ${port}
fi

# 通常コマンドが失敗するときにコンテナを延命させるデバッグコマンド
# tail -n 1 -f package.json > /dev/null