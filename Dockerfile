# Stage 1: Build ứng dụng React
FROM node:18-alpine AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Chỉ sao chép các file cần thiết để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install --prefer-offline

# Sao chép toàn bộ mã nguồn vào image
COPY . .

# Build ứng dụng React
RUN npm run build

# Stage 2: Sử dụng NGINX để phục vụ file tĩnh
FROM nginx:alpine

# Xóa cấu hình mặc định của NGINX
RUN rm /etc/nginx/conf.d/default.conf

# Sao chép file build vào thư mục NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Sao chép file cấu hình NGINX tùy chỉnh
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose cổng 80
EXPOSE 80

# Khởi động NGINX
CMD ["nginx", "-g", "daemon off;"]