#!/bin/sh
pm2 stop 'npm run start'
npm ci
npm run build
pm2 start 'npm run start' --watch