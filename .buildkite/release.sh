STAGE=$BUILDKITE_BRANCH
if [ "$STAGE" = 'main' ]; then
  STAGE='production'
fi

if [ "$STAGE" != 'production' ]; then
  echo 'Stage '$STAGE' unknown, skipping deploy'
  exit 0
fi

cd /opt/docker/credits-gibber || exit
docker-compose pull app
docker-compose up -d app
