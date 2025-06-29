const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Match the secret in usuario.service.js

const authMiddleware = (req, res, next) => {
    // Pega o token do header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido' });
    }

    // O token vem como "Bearer <token>", então precisamos pegar apenas o token
    const token = authHeader.split(' ')[1];

    try {
        // Verifica se o token é válido
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Adiciona o id do usuário ao objeto da requisição
        req.usuarioId = decoded.usuarioId;
        
        return next();
    } catch (erro) {
        return res.status(401).json({ erro: 'Token inválido' });
    }
};

module.exports = authMiddleware;