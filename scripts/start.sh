#!/bin/sh
set -e

# A deploy swaps the container and never touches the database. Without this
# line new code starts against an old schema — which is how the public listing
# answered 500 on 2026-09-01: an additive migration was left unapplied and the
# queries began asking for columns that did not exist.
#
# `set -e` above is half of the fix: if the migration fails, the container does
# not start. A container that will not start is visible; an application running
# against a schema it does not know is not.
#
# This stays safe only while migrations remain additive. One that drops a column
# now runs unattended, so the rule holds: expand in one deploy, contract in a
# later one.
#
# The binary directly, not `pnpm exec`: the Dockerfile's production stage never
# runs `corepack enable`, so pnpm does not exist in there. node_modules is
# copied whole from the build, with the Prisma CLI and its `.bin` links.
./node_modules/.bin/prisma migrate deploy

node dist/apps/microservice/main.js &
exec node dist/apps/immigrant_be/main.js
