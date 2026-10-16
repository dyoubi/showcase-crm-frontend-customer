FROM node:20-alpine

WORKDIR /app
ENTRYPOINT ["/app/scripts/docker_entrypoint.sh"]
# CMD yarn run start
ENV NODE_ENV=production PORT=3000 NEXT_CASINO_SLUG=egcbitplay NEXT_PUBLIC_BACKEND_URL_INTERNAL=http://develop.casino-backend
EXPOSE 3000

# This should copy the .yarnrc.yml file once yarn >= v.2.X
COPY ["package.json", ".npmrc", "yarn.lock", "./"]
RUN set -ex; \
    apk add --no-cache bash bind-tools libc6-compat ;\
    yarn install --immutable --immutable-cache --check-cache --production=false ;\
    yarn cache clean --all

COPY . .

ARG CI_COMMIT_SHA=
ENV CI_COMMIT_SHA=$CI_COMMIT_SHA
RUN yarn run build
