FROM node:16.17-alpine
# Set ENV
ENV CHOKIDAR_USEPOLLING=true

WORKDIR /usr/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app config files
COPY tsconfig.json ./

# Copy app sources
COPY src src/
COPY public public/

RUN npm install -g serve

RUN npm run build

EXPOSE 80

CMD [ "serve", "-p", "3000", "-s", "build" ]