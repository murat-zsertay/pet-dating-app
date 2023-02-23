#! /bin/bash
cd ..
# shellcheck disable=SC2164
# Starts a pm2 process in a particular environment depending on the environment
# variables passed in
# $1 would be the first variable and the directory where the ecosystem.js
# file is located
# $2 is the specific environment you would like to setup for.

cd "$1"
pm2 start ecosystem.config.cjs --env "$2"
pm2 save
# Export the function so it can be used in other scripts
