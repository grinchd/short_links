FROM node:10-alpine

ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm install --production --quiet

COPY ./dist ./dist

EXPOSE 3000