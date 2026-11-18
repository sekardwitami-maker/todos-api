const express = require('express');
const router = express.Router();
const { 
    getCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} = require('../controller/category.controller');
const { protect } = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Manajemen Kategori (Membutuhkan Autentikasi Bearer Token untuk aksi tertentu)
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Mengambil semua kategori
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar kategori
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Membuat kategori baru
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pekerjaan Rumah
 *     responses:
 *       201:
 *         description: Kategori berhasil dibuat
 *       400:
 *         description: Input tidak valid
 *       401:
 *         description: Unauthorized
 */
router.route('/')
    .get(getCategories)
    .post(protect, createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   patch:
 *     summary: Mengubah kategori berdasarkan ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dari kategori
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pekerjaan Kantor
 *     responses:
 *       200:
 *         description: Kategori berhasil diubah
 *       404:
 *         description: Kategori tidak ditemukan
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Menghapus kategori berdasarkan ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dari kategori
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus
 *       404:
 *         description: Kategori tidak ditemukan
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .patch(protect, updateCategory)
    .delete(protect, deleteCategory);

module.exports = router;