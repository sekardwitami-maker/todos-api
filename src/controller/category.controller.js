const Category = require('../model/category.model');
const { AppError, catchAsync } = require('../util/appError.util');

// 1. GET: Mengambil semua kategori
const getCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({ 
        status: 'success', 
        results: categories.length,
        data: { categories } 
    });
});

// 2. POST: Membuat kategori baru
const createCategory = catchAsync(async (req, res, next) => {
    const { name, description } = req.body;

    if (!name) {
        return next(new AppError('Nama category wajib diisi!', 400));
    }

    const newCategory = await Category.create({
        name,
        description: description || ''
    });

    res.status(201).json({ 
        status: 'success', 
        data: { category: newCategory } 
    });
});

// 3. PUT/PATCH: Mengubah kategori berdasarkan ID
const updateCategory = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, description },
        { new: true, runValidators: true }
    );

    if (!updatedCategory) {
        return next(new AppError('Category tidak ditemukan!', 404));
    }

    res.status(200).json({ 
        status: 'success', 
        data: { category: updatedCategory } 
    });
});

// 4. DELETE: Menghapus kategori berdasarkan ID
const deleteCategory = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
        return next(new AppError('Category tidak ditemukan!', 404));
    }

    res.status(200).json({ 
        status: 'success', 
        message: 'Category berhasil dihapus!' 
    });
});

module.exports = { 
    getCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory 
};