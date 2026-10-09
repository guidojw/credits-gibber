FROM node:26.11.1@sha256:32fa97f3363975684b08bf4e8a68a47c7905175cc20275b50b974bbd02aba731

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
