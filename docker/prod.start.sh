#!/bin/bash

cd src/frontend \
    && rm -rf node_modules \
    && npm install \
    && npm run build \
    && npm run serve &
make backend