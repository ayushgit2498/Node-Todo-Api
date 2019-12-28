FROM node:alpine

WORKDIR /home/APP

COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD [ "npm", "start" ]