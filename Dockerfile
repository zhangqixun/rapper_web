# production stage
FROM nginx:stable-alpine as production-stage
COPY ./dist /usr/local/share/nginx/
COPY ./nginx.conf /etc/nginx/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
