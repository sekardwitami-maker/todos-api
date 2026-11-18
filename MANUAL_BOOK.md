# Manual Book Teknis - Todos API

## 1. Deskripsi Project
Todos API adalah backend service untuk aplikasi pengelolaan tugas harian yang dibangun menggunakan Node.js, Express, dan MongoDB. Dilengkapi dengan autentikasi JWT, manajemen kategori, Activity Log, statistik dengan API Key, serta dokumentasi interaktif Swagger.

## 2. Teknologi yang Digunakan
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Autentikasi**: JSON Web Token (JWT) & API Key
- **Testing**: Jest & Supertest
- **Dokumentasi**: Swagger UI

## 3. Daftar Endpoint Utama
- **Auth**: `/api/auth/signup`, `/api/auth/login`
- **Todos**: `/api/todos` (CRUD dengan fitur filter, search, sorting, pagination)
- **Categories**: `/api/categories`
- **Activity Log**: `/api/activity-logs`
- **Stats**: `/api/stats` (Dilindungi dengan header `x-api-key`)
- **Dokumentasi**: `/api-docs`

## 4. Cara Menjalankan Aplikasi
1. Buka folder project di VS Code.
2. Buat file `.env` dan sesuaikan konfigurasinya (`PORT`, `MONGO_URI`, `JWT_SECRET`, `API_KEY`).
3. Jalankan perintah `npm install` di terminal.
4. Jalankan aplikasi dengan perintah `npm start`.
5. Akses dokumentasi Swagger di browser melalui: `http://localhost:5000/api-docs/`