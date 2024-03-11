FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run build
EXPOSE 8000
CMD [ "npm", "start" ]