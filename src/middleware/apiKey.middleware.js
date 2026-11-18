const { AppError } = require('../util/appError.util');

const protectApiKey = (req, res, next) => {
    // Mengambil API key dari header request
    const apiKey = req.headers['x-api-key'];

    // Menentukan kunci rahasia API Key
    const validApiKey = process.env.API_KEY || 'gamelab-secret-key-123';

    // Validasi apakah API key disertakan dan sesuai
    if (!apiKey || apiKey !== validApiKey) {
        return next(new AppError('Unauthorized: API Key tidak valid atau tidak ditemukan!', 401));
    }

    next();
};

module.exports = protectApiKey;