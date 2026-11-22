# ==========================
# Stage 1: Build React App
# ==========================
FROM node:24-alpine AS builder

WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build production
ARG BUILD_MODE=dev
RUN npx tsc -b && npx vite build --mode ${BUILD_MODE}

# ==========================
# Stage 2: Nginx
# ==========================
FROM nginx:1.29-alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]