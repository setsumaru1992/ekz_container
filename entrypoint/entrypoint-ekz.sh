cd $(dirname $0)
cd ..

CONTAINER_ROOT="$(pwd)"
cd ${CONTAINER_ROOT}
echo "CONTAINER_ROOT: ${CONTAINER_ROOT}"
source .env

echo "========== start ekz_api(rails) =========="
API_ROOT="${CONTAINER_ROOT}/ekz_api"
cd ${API_ROOT}

echo "========== bundle install =========="
bundle install

rails assets:precompile

rm -f ${API_ROOT}/tmp/pids/server.pid
# cp /etc/opt/stock_view_rb/master.key config/
rails server -p ${EKZ_API_PORT} -e ${EKZ_RAILS_ENV} &

echo "========== start ekz(react) =========="
EKZ_ROOT="${CONTAINER_ROOT}/ekz"
cd ${EKZ_ROOT}
yarn install
yarn start &