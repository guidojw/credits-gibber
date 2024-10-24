FROM node:23.0.0@sha256:9d09fa506f5b8465c5221cbd6f980e29ae0ce9a3119e2b9bc0842e6a3f37bb59

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ARG BUILD_HASH
ENV BUILD_HASH=$BUILD_HASH

# Install dependencies
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Bundle app source
COPY . .
RUN yarn build

CMD yarn start
