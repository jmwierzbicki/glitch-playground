#!/bin/bash
pm2 stop 'npm run start'
cd /var/www/my-app
npm ci
npm run build
pm2 start 'npm run start' --watch