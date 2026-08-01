# Use the official Nginx image
FROM nginx:latest

# Copy website files into Nginx's web directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80