FROM node:14

WORKDIR /src

EXPOSE 3000

COPY package*.json .

RUN npm i

COPY . . 

CMD ["node", "index.js"]