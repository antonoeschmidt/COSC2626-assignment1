FROM node:18.15-alpine AS build
ENV NODE_ENV production
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
