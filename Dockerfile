FROM node:latest as build
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn --production
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]