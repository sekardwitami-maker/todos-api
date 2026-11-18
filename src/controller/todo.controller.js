const Todo = require('../model/todo.model.js');
const ActivityLog = require('../model/activityLog.model.js');
const { AppError, catchAsync } = require('../util/appError.util');

// 1. GET: Mengambil semua data todo milik user yang sedang login (Dilengkapi Filtering, Search, Sorting, & Pagination)
const getTodos = catchAsync(async (req, res, next) => {
    // A. FILTERING
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // Filter utama: wajib milik user yang sedang login
    let query = Todo.find({ 
        user: req.user._id, 
        ...JSON.parse(queryStr) 
    }).populate('category');

    // B. SEARCH (Pencarian berdasarkan title atau description secara case-insensitive)
    if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        query = query.find({
            $or: [
                { title: searchRegex },
                { description: searchRegex }
            ]
        });
    }

    // C. SORTING (Pengurutan data, misal: ?sort=-createdAt atau ?sort=title)
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        // Default sorting dari yang paling baru
        query = query.sort('-createdAt');
    }

    // D. PAGINATION (Contoh: ?page=1&limit=5)
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Jalankan query
    const todos = await query;

    res.status(200).json({ 
        status: 'success',
        results: todos.length,
        page,
        limit,
        data: { todos } 
    });
});

// 2. GET BY ID: Mengambil detail satu todo berdasarkan ID (dengan pengecekan kepemilikan)
const getTodoById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id, user: req.user._id }).populate('category');

    if (!todo) {
        return next(new AppError('Todo tidak ditemukan atau Anda tidak memiliki akses ke todo ini!', 404));
    }

    res.status(200).json({ 
        status: 'success',
        data: { todo } 
    });
});

// 3. POST: Menambah data baru (terikat ke user yang login + Activity Log)
const createTodo = catchAsync(async (req, res, next) => {
    const { title, description, status, category } = req.body;

    if (!title) {
        return next(new AppError('Judul todo wajib diisi!', 400));
    }

    const newTodo = await Todo.create({
        title,
        description: description || '',
        status: status || 'pending',
        category,
        user: req.user._id
    });

    // Catat Activity Log untuk Create
    await ActivityLog.create({
        user: req.user._id,
        action: 'CREATE_TODO',
        description: `Menambahkan todo baru dengan judul: "${newTodo.title}"`
    });

    res.status(201).json({ 
        status: 'success',
        data: { todo: newTodo } 
    });
});

// 4. PUT/PATCH: Mengubah data berdasarkan ID (dengan pengecekan kepemilikan + Activity Log)
const updateTodo = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, status, category } = req.body;

    const updatedTodo = await Todo.findOneAndUpdate(
        { _id: id, user: req.user._id },
        { title, description, status, category },
        { new: true, runValidators: true }
    );

    if (!updatedTodo) {
        return next(new AppError('Todo tidak ditemukan atau Anda tidak memiliki akses ke todo ini!', 404));
    }

    // Catat Activity Log untuk Update
    await ActivityLog.create({
        user: req.user._id,
        action: 'UPDATE_TODO',
        description: `Mengubah todo dengan judul: "${updatedTodo.title}"`
    });

    res.status(200).json({ 
        status: 'success',
        data: { todo: updatedTodo } 
    });
});

// 5. DELETE: Menghapus data berdasarkan ID (dengan pengecekan kepemilikan + Activity Log)
const deleteTodo = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deletedTodo) {
        return next(new AppError('Todo tidak ditemukan atau Anda tidak memiliki akses untuk menghapusnya!', 404));
    }

    // Catat Activity Log untuk Delete
    await ActivityLog.create({
        user: req.user._id,
        action: 'DELETE_TODO',
        description: `Menghapus todo dengan judul: "${deletedTodo.title}"`
    });

    res.status(200).json({ 
        status: 'success', 
        message: 'Todo berhasil dihapus!' 
    });
});

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};