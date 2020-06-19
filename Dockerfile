FROM nginx:1.14.1-alpine

COPY /dist/PracticaDeDocker /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
