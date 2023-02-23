#! /bin/bash
# Starts a pm2 process in a particular environment depending on the environment
# variables passed in
# $1 would be the first variable and the directory where the ecosystem.js
# Starts a server in a particular environment depending on the environment
# variable passed in
# set file permissions

# Determine the directory the script is being run from
current_dir=$(pwd)


if [[ $current_dir == *"/frontend"* || $current_dir == *"/backend"* ]]; then
  cd ..
  pm2 start ecosystem.config.cjs --env "$1"
  pm2 save

  cd $(basename "$current_dir")
else
  echo "Unknown directory"
  exit 1
fi

# Start the service using the appropriate ecosystem file
