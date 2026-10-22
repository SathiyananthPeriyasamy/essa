# Stage 1: Build the Vite production bundle
FROM node:22-alpine AS builder
WORKDIR /app

# Copy dependency files first to optimize Docker layer caching
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source code and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve static files using lightweight Nginx
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# Clean default Nginx html files
RUN rm -rf ./*

# Copy built production assets from builder stage
COPY --from=builder /app/dist ./

# Copy custom Nginx configuration
COPY deployed/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
