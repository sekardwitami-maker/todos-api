const express = require('express');
const router = express.Router();
const statsController = require('../controller/stats.controller');
const protectApiKey = require('../middleware/apiKey.middleware');

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: Statistik API (Membutuhkan API Key pada Header x-api-key)
 */

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Mengambil statistik penggunaan API todos
 *     tags: [Stats]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil data statistik
 *       401:
 *         description: Unauthorized (API Key tidak valid atau tidak disertakan)
 */
router.get('/', protectApiKey, statsController.getTodoStats);

module.exports = router;