const { body, validationResult } = require('express-validator');

const validateTodo = [
    body('title').notEmpty().withMessage('Judul todo wajib diisi!'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateTodo };