FROM node:23.4-alpine

RUN addgroup app && adduser app -S -G app app
USER app

WORKDIR /app

COPY --chown=app:node package*.json ./

RUN npm install

COPY --chown=app:node . ./

EXPOSE 3000

CMD ["npm", "run", "dev"]
