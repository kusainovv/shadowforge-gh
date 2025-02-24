#!/bin/bash

# Default port is 3000, but can be overridden by the first script argument
PORT=${1:-3000}

cd src/frontend \
    && rm -rf node_modules \
    && npm install \
    && npm run dev:docker &
make init
# make backend

