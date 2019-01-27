FROM node:alpine
ENV NODE_ENV production

WORKDIR /server

ADD  ./dist /server/dist
COPY .env /server
COPY package.json /server
COPY package-lock.json /server

RUN npm install

EXPOSE 20500
EXPOSE 5000
