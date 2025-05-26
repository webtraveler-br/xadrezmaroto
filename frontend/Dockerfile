FROM node:18-alpine

WORKDIR /app
EXPOSE 3000

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

CMD ["npm", "run", "dev"]