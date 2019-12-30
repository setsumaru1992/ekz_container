cd $(dirname $0 >> /dev/null && pwd)
cd ..
CONTAINER_ROOT="$(pwd)"

envpath=$(readlink .env)
source $envpath

killProcess () {
    port=$1
    headerSample="PID"
    pid=$(lsof -i :$port | grep -v $headerSample | head -n 1 | awk '{print $2}')
    execCmd="kill -9 $pid"
    echo "$execCmd"
    bash -c "$execCmd"
}

echo "========== start ekz_api(rails) =========="
API_ROOT="${CONTAINER_ROOT}/ekz_api"
cd ${API_ROOT}

echo "========== bundle install =========="
bundle install

rails assets:precompile

rm -f ${API_ROOT}/tmp/pids/server.pid
killProcess ${EKZ_API_PORT}
# cp /etc/opt/stock_view_rb/master.key config/
rails server -p ${EKZ_API_PORT} -e ${EKZ_RAILS_ENV} &

echo "========== start ekz(react) =========="
EKZ_ROOT="${CONTAINER_ROOT}/ekz"
killProcess 3000

cd ${EKZ_ROOT}
yarn install
yarn build
yarn start &
