# Create image based on the official nginx image from dockerhub
FROM nginx:1.14.1-alpine

# Copy application
COPY /dist/PracticaDeDocker /usr/share/nginx/html

# Expose the port the app runs in
EXPOSE 80

# Serve the app
CMD ["nginx", "-g", "daemon off;"]
