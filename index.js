const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

// --- IMPORT SWAGGER DOCS ---
const swaggerDocs = require('./src/config/swagger');

// --- ERROR MIDDLEWARE ---
const { notFound, errorHandler } = require('./src/middleware/error.middleware');

// Load konfigurasi dari file .env
dotenv.config();

// Inisialisasi koneksi database MongoDB
connectDB();

const app = express();

// Middleware dasar
app.use(express.json());
app.use(cors());

// ==========================================
// IMPORT ROUTES
// ==========================================
const todoRoutes = require('./src/route/todo.route');
const categoryRoutes = require('./src/route/category.route');
const authRoutes = require('./src/route/auth.route');
const statsRoutes = require('./src/route/stats.route'); // Route statistik dengan API Key

// ==========================================
// GUNAKAN ROUTES
// ==========================================
app.use('/api/todos', todoRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/v1/stats', statsRoutes); // Endpoint stats yang dilindungi API Key

// Endpoint dummy untuk Activity Logs (jika belum dibuat file routenya)
app.get('/api/activity-logs', (req, res) => {
    res.status(200).json({ success: true, message: 'Activity logs retrieved successfully', data: [] });
});

// Route uji coba server
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Todos-Api Production Stage!' });
});

// ==========================================
// PANGGIL DOKUMENTASI SWAGGER
// ==========================================
swaggerDocs(app);

// ==========================================
// ERROR HANDLING MIDDLEWARE (Harus di paling bawah)
// ==========================================
app.use(notFound);
app.use(errorHandler);

// Menjalankan server pada port dari .env atau 5000 (Hanya jika tidak sedang di-test)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running smoothly on port ${PORT}`);
    });
}

// Ekspor app untuk keperluan pengujian Jest / Supertest
module.exports = app;