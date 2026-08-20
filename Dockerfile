# ==========================================
# AŞAMA 1: Build (Node.js)
# ==========================================
FROM node:22-alpine AS build

WORKDIR /app

# Paket tanımlarını kopyala ve bağımlılıkları yükle
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Kaynak kodları kopyala ve production bundle oluştur
COPY . .
RUN npm run build

# ==========================================
# AŞAMA 2: Production Sunucusu (NGINX)
# ==========================================
FROM nginx:stable-alpine

# Nginx yapılandırmasını kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Derlenen React uygulamasını NGINX web kök dizinine kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# HTTP portunu dışa aç
EXPOSE 80

# NGINX'i başlat
CMD ["nginx", "-g", "daemon off;"]
