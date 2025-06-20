const express = require('express');
const router = express.Router();
const healthRoutes = require('./healthRoutes');
const livroRoutes = require('./livroRoutes');
const usuarioRoutes = require('./usuarioRoutes');

router.use('/', healthRoutes);
router.use('/livros', livroRoutes);
router.use('/usuarios', usuarioRoutes);

module.exports = router;