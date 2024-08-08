FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Servir el contenido estático con un servidor HTTP simple
RUN npm install -g serve
CMD ["serve", "-s", "build"]

EXPOSE 5000
