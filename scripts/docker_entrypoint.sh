#!/bin/bash
set -e

if [[ "${EXPOSE_SOURCEMAPS:-0}" != "1" ]]; then
    find /app/.next/ -name "*.map" -type f -delete
fi

exec "$@"
