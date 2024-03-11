FROM node:alpine
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
EXPOSE 5721
CMD [ "npm", "start" ]