#! /bin/bash
cd ..
# shellcheck disable=SC2164
cd "$1"
pm2 start ecosystem.config.cjs --env "$2"
pm2 save
# Export the function so it can be used in other scripts
