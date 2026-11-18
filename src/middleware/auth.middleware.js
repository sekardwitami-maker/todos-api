const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../model/user.model');
const { AppError, catchAsync } = require('../util/appError.util');

// 1. Middleware Protect: Verifikasi Token JWT & Cek Keaktifan User
exports.protect = catchAsync(async (req, res, next) => {
    // Ambil token dari header Authorization (Bearer <token>)
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Anda belum login! Silakan login untuk mendapatkan akses.', 401));
    }

    // Verifikasi keaslian token (ditambahkan .trim() untuk mencegah karakter tersembunyi/enter)
    const decoded = await promisify(jwt.verify)(token.trim(), process.env.JWT_SECRET || 'fallback_secret_key');

    // Cek apakah user yang pemilik token ini masih terdaftar di database
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('User yang memiliki token ini sudah tidak ada.', 401));
    }

    // Masukkan data user ke dalam objek req agar bisa dipakai di controller berikutnya
    req.user = currentUser;
    next();
});

// 2. Middleware RestrictTo: Otorisasi berdasarkan role (contoh: 'admin')
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('Anda tidak memiliki izin untuk melakukan aksi ini.', 403));
        }
        next();
    };
};