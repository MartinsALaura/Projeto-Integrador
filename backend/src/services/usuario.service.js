const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const usuarioService = {
    async buscarPorEmail(email) {
        try {
            if (!email) {
                throw new Error('Email é obrigatório');
            }
            const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao buscar usuário por email:', error);
            throw error;
        }
    },

    async criar(usuarioData) {
        try {
            const { nome, email, senha } = usuarioData;
            
            if (!nome || !email || !senha) {
                throw new Error('Nome, email e senha são obrigatórios');
            }

            const existingUsuario = await this.buscarPorEmail(email);
            if (existingUsuario) {
                throw new Error('Email já cadastrado');
            }

            const hashedPassword = await bcrypt.hash(senha, 10);

            const [result] = await pool.execute(
                'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
                [nome, email, hashedPassword]
            );

            if (!result.insertId) {
                throw new Error('Erro ao inserir usuário no banco de dados');
            }

            return { id: result.insertId, nome, email };
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    },

    async authenticate(email, senha) {
        try {
            const usuario = await this.buscarPorEmail(email);
            if (!usuario) {
                throw new Error('Login ou senha incorretos');
            }

            const isValidPassword = await bcrypt.compare(senha, usuario.senha);
            if (!isValidPassword) {
                throw new Error('Login ou senha incorretos');
            }

            const token = jwt.sign(
                { usuarioId: usuario.id, email: usuario.email },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            return { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } };
        } catch (error) {
            console.error('Erro na autenticação:', error);
            throw error;
        }
    }
};

module.exports = usuarioService;