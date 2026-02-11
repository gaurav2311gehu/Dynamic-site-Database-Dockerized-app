FROM node:18

WORKDIR /app

# package.json copy
COPY package*.json ./

# dependencies install
RUN npm install

# baaki project files copy
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
