FROM node:20.18.0@sha256:a5e0ed56f2c20b9689e0f7dd498cac7e08d2a3a283e92d9304e7b9b83e3c6ff3

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
