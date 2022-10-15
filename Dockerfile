FROM node:16.14.0-buster-slim AS builder
WORKDIR /builder/
COPY package*.json /builder/
RUN npm install
COPY . /builder/
RUN npm run build

FROM node:16.14.0-buster-slim AS production
WORKDIR /app/
COPY --from=builder /builder/package*.json /app/
RUN npm install --omit=dev
COPY --from=builder /builder/dist /app/dist/
COPY --from=builder /builder/server.js /app/
EXPOSE 3000
CMD [ "node", "server.js" ]
