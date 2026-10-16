#!/bin/sh
set -e

if echo "$CI_REGISTRY_IMAGE" | grep -E '^registry.gitlab.com.*' > /dev/null; then
    mkdir -p /kaniko/.docker
    echo "{\"auths\":{\"${CI_REGISTRY}\":{\"auth\":\"$(printf "%s:%s" "${CI_REGISTRY_USER}" "${CI_REGISTRY_PASSWORD}" | base64 | tr -d '\n')\"}}}" > /kaniko/.docker/config.json
elif echo "$CI_REGISTRY_IMAGE" | grep -E '^([0-9]+.){3}[0-9]+:[0-9]+.*' > /dev/null; then
    KANIKO_ARGS="--insecure-registry=\"$(echo $CI_REGISTRY_IMAGE | cut -d/ -f1)\" ${KANIKO_ARGS}"
fi

if test "${IMAGE_TAG2}"; then
    KANIKO_ARGS="--destination=${CI_REGISTRY_IMAGE}:${IMAGE_TAG2} ${KANIKO_ARGS}"
fi

/kaniko/executor \
    --context="dir://${CI_PROJECT_DIR}" \
    --dockerfile="${CI_PROJECT_DIR}/Dockerfile" \
    --destination="${CI_REGISTRY_IMAGE}:${IMAGE_TAG}" \
    --use-new-run \
    --cache-repo="${CI_REGISTRY_IMAGE}/cache" \
    --cache \
    ${KANIKO_ARGS:-}
