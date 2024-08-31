# Base image
FROM node:lts AS base

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY . .

# Install app dependencies
RUN npm install tsc -g
RUN npm i
RUN npx prisma generate
RUN npx prisma db push --force-reset

CMD [ "npm", "run", "start" ]