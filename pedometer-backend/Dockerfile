FROM node:16-alpine

LABEL maintainer="David Thomas<djt.in7@gmail.com>"
LABEL version=1.0
LABEL description="Team pedometer backend"

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm ci
RUN npm run build

CMD "npm" "start"