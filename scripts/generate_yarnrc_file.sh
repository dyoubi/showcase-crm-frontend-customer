#!/bin/sh
set -e

# This should only be executed once we are using yarn v.2.X
echo "Generating .yarnrc.yml file..."
{
  echo "enableImmutableInstalls: false"
  echo "enableScripts: true"
  echo "npmAlwaysAuth: true"
  echo "npmScopes:"
  echo "  ${EGC_IO_GROUP_NAMESPACE}:"
  echo "    npmRegistryServer: \"https://${CI_SERVER_HOST}/api/v4/packages/npm/\""
  echo "    npmAuthToken: \"${EGC_IO_NPM_TOKEN}\""
  echo "  ${RING_GROUP_NAMESPACE}:"
  echo "    npmRegistryServer: \"https://${CI_SERVER_HOST}/api/v4/packages/npm/\""
  echo "    npmAuthToken: \"${RING_NPM_TOKEN}\""
} > .yarnrc.yml
echo ".yarnrc.yml file generated"
