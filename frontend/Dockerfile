FROM node:alpine as build

WORKDIR /app

COPY ./package*.json /app

RUN npm install

COPY . .

RUN npm run build

# Use an official Nginx runtime as a parent image
FROM nginx:alpine
# Copy the ngnix.conf to the container
COPY ngnix.conf /etc/nginx/conf.d/default.conf
# Copy the React app build files to the container
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80 for Nginx
EXPOSE 80
# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]