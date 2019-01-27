FROM node:alpine
ENV NODE_ENV production

WORKDIR /server

COPY . /server
RUN npm install

EXPOSE 20500
EXPOSE 5000
