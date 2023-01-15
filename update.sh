#!/bin/sh
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
cd /var/www/my-app
ls
pm2 stop 'npm run start'
npm ci
npm run build
pm2 start 'npm run start' --watch