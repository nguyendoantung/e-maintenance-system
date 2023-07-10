FROM node:16.19.0
#  AS builder
# FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

ENV REACT_APP_URL_API="http://localhost:3451"

# COPY ["package.json", "package-lock.json*", "./"]
COPY package.json ./
COPY package-lock.json ./

RUN npm install --production
# RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "start"]

# ADD yarn.lock yarn.lock
# ADD package.json package.json
# RUN yarn install --frozen-lockfile

# ENV REACT_APP_URL_API="http://localhost:3451"

# ADD jsconfig.json jsconfig.json
# ADD ./src ./src
# ADD ./public ./public
# ADD ./scripts scripts
# ADD ./config config