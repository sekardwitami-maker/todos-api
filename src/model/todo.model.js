const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Judul todo wajib diisi'],
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    // --- TAMBAHKAN RELASI INI ---
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Todo harus memiliki pemilik (user)']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Todo harus memiliki category']
    },
    // ----------------------------
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);