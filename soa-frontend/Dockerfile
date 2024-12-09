
FROM node:22.10.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . . 

RUN npm run build --prod

 
FROM nginx:alpine

COPY --from=builder /app/dist/p-soa-2 /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
