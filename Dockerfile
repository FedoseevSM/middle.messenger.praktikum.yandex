FROM node:16.14.0-buster-slim AS builder
WORKDIR /builder/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.14.0-buster-slim AS production
WORKDIR /app/
COPY --from=builder /builder/package*.json ./
RUN npm install --omit=dev
COPY --from=builder /builder/dist ./dist/
COPY --from=builder /builder/server.js ./
EXPOSE 3000
CMD [ "node", "server.js" ]
