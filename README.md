# Todos API - Gamelab Production Stage

Backend API untuk aplikasi manajemen tugas (Todos) yang dibangun menggunakan Node.js, Express, dan MongoDB. Dilengkapi dengan sistem autentikasi JWT, validasi, pengujian otomatis (Jest/Supertest), serta dokumentasi API interaktif menggunakan Swagger UI.

---

## 🚀 Fitur Utama
- **Autentikasi Pengguna**: Register (`/signup`) dan Login (`/login`) menggunakan JWT (JSON Web Token).
- **Manajemen Todos**: Operasi CRUD data tugas milik pengguna yang sedang login.
- **Manajemen Kategori**: Pengelolaan kategori tugas.
- **Statistik API**: Endpoint statistik khusus yang dilindungi dengan API Key (`x-api-key`).
- **Dokumentasi Swagger**: Dokumentasi endpoint interaktif yang dapat diakses langsung via browser.

## 🔐 Environment Variables (.env)
Sebelum menjalankan aplikasi, pastikan Kakak sudah membuat file `.env` di folder utama project dengan format seperti ini:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todos-api
JWT_SECRET=rahasia_jwt_anda
API_KEY=rahasia_api_key_anda