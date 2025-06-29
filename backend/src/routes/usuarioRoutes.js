const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.get('/verificar-email', usuarioController.verificarEmail);
router.get('/:usuarioId/livros', authMiddleware, usuarioController.getLivrosByUsuario);

module.exports = router;