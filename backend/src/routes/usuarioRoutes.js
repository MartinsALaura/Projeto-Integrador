const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.get('/verificar-email', usuarioController.verificarEmail);

module.exports = router;