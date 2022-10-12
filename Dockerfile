FROM node:16.14.0-buster-slim
WORKDIR /app/
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build
EXPOSE 3000
CMD [ "node", "server.js" ]