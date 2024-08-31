# Base image
FROM node:lts AS base

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY . .

# Install app dependencies
RUN npm install tsc -g
RUN npm i
RUN npx prisma generate

CMD [ "npm", "run", "start" ]