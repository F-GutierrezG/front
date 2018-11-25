FROM node:11.1.0

RUN mkdir -p /app/db
RUN mkdir -p /app/routes

WORKDIR /app

COPY package.json /app/package.json
COPY server.js /app/server.js
COPY db/db.json /app/db/db.json
COPY routes/openRoutes.json /app/routes/openRoutes.json

RUN npm install --silent

CMD ["node", "server.js"]
