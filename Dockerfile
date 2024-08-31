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

RUN npm run build 


FROM node:18 AS production

# Create app directory
WORKDIR /usr/src/app

COPY --from=base usr/src/app/node_modules ./node_modules
COPY --from=base usr/src/app/prisma ./prisma
COPY --from=base /usr/src/app/dist ./dist

EXPOSE 8080
# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]