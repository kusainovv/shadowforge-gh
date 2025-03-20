# Build stage: frontend
FROM node:20-alpine AS frontend_build
ARG BACKEND_URL
ENV BACKEND_URL=${BACKEND_URL}

WORKDIR /app

# Copy dependencies first to leverage Docker caching
COPY ./package.json /app/
RUN npm install

# Copy remaining files
COPY ./tsconfig.json ./vite.config.mts ./index.html ./tailwind.config.mjs ./postcss.config.js /app/
COPY ./src /app/src

# Build the frontend
RUN npm run build

# Production stage: Nginx
FROM nginx AS frontend

# Copy built frontend from previous stage
COPY --from=frontend_build /app/build/ /usr/share/nginx/html

# Copy Nginx configuration
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY start-nginx.sh /start-nginx.sh

# Ensure the startup script is executable
RUN chmod +x /start-nginx.sh

# Correctly pass BACKEND_URL as an environment variable
ARG BACKEND_URL
ENV BACKEND_URL=${BACKEND_URL}

CMD ["/start-nginx.sh"]