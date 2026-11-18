const express = require('express');
const router = express.Router();

// Import Controller Auth
const authController = require('../controller/auth.controller');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autentikasi Pengguna (Registrasi & Login)
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Mendaftarkan akun pengguna baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secretpassword123
 *     responses:
 *       201:
 *         description: Pengguna berhasil terdaftar
 *       400:
 *         description: Input tidak valid atau email sudah terdaftar
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Masuk ke akun pengguna dan mendapatkan token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secretpassword123
 *     responses:
 *       200:
 *         description: Login berhasil dan mengembalikan token JWT
 *       400:
 *         description: Email atau password salah
 */
router.post('/login', authController.login);

module.exports = router;