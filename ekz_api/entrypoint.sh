#! /bin/bash

bundle install

pidfile="tmp/pids/server.pid"
touch $pidfile
rm $pidfile

port=${EKZ_API_PORT}
pre_process="$(ps -ef |grep ":$port" |grep -v "grep" |awk '{print $2}')"
kill -9 $pre_process
bundle exec rails s -p $port -b "0.0.0.0" &

logfile="log/development.log"
touch $logfile # 起動時はないため明示的に作成
tail -f $logfile