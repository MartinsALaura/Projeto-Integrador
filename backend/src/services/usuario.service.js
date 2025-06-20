const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use environment variable

const usuarioService = {
    async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },

    async create(usuarioData) {
        const { nome, email, senha } = usuarioData;
        
        const existingUsuario = await this.findByEmail(email);
        if (existingUsuario) {
            throw new Error('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const [result] = await pool.execute(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hashedPassword]
        );

        return { id: result.insertId, nome, email };
    },

    async authenticate(email, senha) {
        const usuario = await this.findByEmail(email);
        
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        const isValidPassword = await bcrypt.compare(senha, usuario.senha);
        if (!isValidPassword) {
            throw new Error('Senha incorreta');
        }

        // Generate JWT token
        const token = jwt.sign(
            { usuarioId: usuario.id, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        };
    }
};

module.exports = usuarioService;