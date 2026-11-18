const User = require('../model/user.model');
const AppError = require('../util/appError.util').AppError; // Atau const { AppError, catchAsync } jika digabung
const catchAsync = require('../util/appError.util').catchAsync;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Fungsi untuk membuat JWT Token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key', {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });
};

// Endpoint Register
exports.signup = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    // Buat user baru (password akan otomatis di-hash oleh pre-save hook di user.model.js)
    const newUser = await User.create({
        username,
        email,
        password
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        }
    });
});

// Endpoint Login
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1. Cek apakah email dan password diisi
    if (!email || !password) {
        return next(new AppError('Harap masukkan email dan password!', 400));
    }

    // 2. Cari user berdasarkan email dan ambil password-nya (+password jika di-select: false)
    const user = await User.findOne({ email }).select('+password');

    // 3. Cek apakah user ada dan password cocok
    // (Jika di model belum pakai method khusus, kita bisa bandingkan pakai bcrypt.compare)
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Email atau password salah!', 401));
    }

    // 4. Jika valid, kirim token JWT ke client
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    });
});