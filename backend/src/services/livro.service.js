const { pool } = require('../config/database');

const livroModel = {
    create: async (livro) => {
        const [result] = await pool.execute(
            'INSERT INTO livros (titulo, autor, contato, endereco, descricao, imagem, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [livro.titulo, livro.autor, livro.contato, livro.endereco, livro.descricao, livro.imagem, livro.usuario_id]
        );
        return result;
    },

    getAll: async () => {
        const [rows] = await pool.execute('SELECT * FROM livros ORDER BY created_at DESC');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.execute('SELECT * FROM livros WHERE id = ?', [id]);
        return rows[0];
    },

    getByUsuarioId: async (usuario_id) => {
        const [rows] = await pool.execute('SELECT * FROM livros WHERE usuario_id = ?', [usuario_id]);
        return rows;
    },

    update: async (id, livro) => {
        const [result] = await pool.execute(
            'UPDATE livros SET titulo = ?, autor = ?, contato = ?, endereco = ?, descricao = ?, imagem = ? WHERE id = ? AND usuario_id = ?',
            [livro.titulo, livro.autor, livro.contato, livro.endereco, livro.descricao, livro.imagem, id, livro.usuario_id]
        );
        return result;
    },

    delete: async (id, usuario_id) => {
        const [result] = await pool.execute(
            'DELETE FROM livros WHERE id = ? AND usuario_id = ?',
            [id, usuario_id]
        );
        return result;
    }
};

module.exports = livroModel;