FROM node:16-alpine as build-stage
WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./
# RUN yarn cache clean

RUN yarn install
COPY . .
RUN yarn build:ra-tool

FROM nginx:1.15.2-alpine
COPY --from=build-stage /usr/app/packages/kaizen-risk-assessment-tool/build /var/www

COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
