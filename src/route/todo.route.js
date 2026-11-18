const express = require('express');
const router = express.Router();

// Import Controller Todo
const { 
    getTodos, 
    getTodoById, 
    createTodo, 
    updateTodo, 
    deleteTodo 
} = require('../controller/todo.controller.js');

// Import Middleware Autentikasi
const { protect } = require('../middleware/auth.middleware.js');

// Import Validator untuk Validasi Input
const { validateTodo } = require('../validator/todo.validator.js');

// Terapkan middleware 'protect' secara global
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Manajemen Data Todos (Membutuhkan Autentikasi Bearer Token)
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Mengambil semua todo milik user yang sedang login
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar todos
 *       401:
 *         description: Unauthorized (Token tidak valid atau tidak ada)
 *   post:
 *     summary: Membuat todo baru
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Belajar Node.js dan Express
 *               description:
 *                 type: string
 *                 example: Menyelesaikan Gamelab Production Stage
 *     responses:
 *       201:
 *         description: Todo berhasil dibuat
 *       400:
 *         description: Input tidak valid (Validasi gagal)
 *       401:
 *         description: Unauthorized
 */
router.get('/', getTodos);           // Mengambil semua todo user
router.post('/', validateTodo, createTodo); // Membuat todo baru (dengan validasi)

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Mengambil detail todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dari todo
 *     responses:
 *       200:
 *         description: Berhasil menemukan todo
 *       404:
 *         description: Todo tidak ditemukan
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Mengubah todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dari todo yang akan diubah
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo berhasil diubah
 *       404:
 *         description: Todo tidak ditemukan
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Menghapus todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dari todo yang akan dihapus
 *     responses:
 *       200:
 *         description: Todo berhasil dihapus
 *       404:
 *         description: Todo tidak ditemukan
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', getTodoById);       // Mengambil detail todo berdasarkan ID
router.put('/:id', updateTodo);        // Mengubah todo berdasarkan ID
router.delete('/:id', deleteTodo);     // Menghapus todo berdasarkan ID

module.exports = router;