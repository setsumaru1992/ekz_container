# https://qiita.com/koara-local/items/1377ddb06796ec8c628a
if   [ -e /etc/debian_version ] ||
     [ -e /etc/debian_release ]; then
    # Check Ubuntu or Debian
    if [ -e /etc/lsb-release ]; then
        # Ubuntu
        distri_name="ubuntu"
    else
        # Debian
        distri_name="debian"
    fi
elif [ -e /etc/redhat-release ]; then
    if [ -e /etc/oracle-release ]; then
        # Oracle Linux
        distri_name="oracle"
    else
        # Red Hat Enterprise Linux
        distri_name="redhat"
    fi
elif [ -e /etc/arch-release ]; then
    # Arch Linux
    distri_name="arch"
else
    # Other
    distri_name="unkown"
fi


if [ "$distri_name" = "ubuntu" ]; then
    cd $(dirname $0 >> /dev/null && pwd)
else
    cd $(dirname $0 && pwd)
fi

cd ..
CONTAINER_ROOT="$(pwd)"

envpath=$(readlink .env)
source $envpath

killProcess () {
    port=$1
    headerSample="PID"
    pid=$(lsof -i :$port | grep -v $headerSample | head -n 1 | awk '{print $2}')
    if [ ! "$pid" = "" ]; then
        execCmd="kill -9 $pid"
        echo "$execCmd"
        bash -c "$execCmd"
    fi
}

echo "========== start ekz_api(rails) =========="
API_ROOT="${CONTAINER_ROOT}/ekz_api"
cd ${API_ROOT}

echo "========== bundle install =========="
if [ "$EKZ_RAILS_ENV" = "production" ]; then
    bundle install --without development
else
    bundle install
fi

bundle exec rails assets:precompile

rm -f ${API_ROOT}/tmp/pids/server.pid
killProcess ${EKZ_API_PORT}
# cp /etc/opt/stock_view_rb/master.key config/
bundle exec rails server -p ${EKZ_API_PORT} -e ${EKZ_RAILS_ENV} &

echo "========== start ekz(react) =========="
EKZ_ROOT="${CONTAINER_ROOT}/ekz"
killProcess 3000

cd ${EKZ_ROOT}
yarn install
yarn build
yarn start &
