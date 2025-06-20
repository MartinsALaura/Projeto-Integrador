const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/', livroController.getAll);
router.get('/:id', livroController.getById);

// Rotas protegidas (requerem autenticação)
router.post('/', authMiddleware, livroController.create);
router.put('/:id', authMiddleware, livroController.update);
router.delete('/:id', authMiddleware, livroController.delete);

module.exports = router;