#!/bin/sh
node dist/apps/microservice/main.js &
exec node dist/apps/immigrant_be/main.js
