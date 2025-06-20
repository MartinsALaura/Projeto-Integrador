const service = require('../services/livro.service');

const livroController = {
    create: async (req, res) => {
        try {
            const { titulo, autor, contato, endereco, descricao, imagem } = req.body;
            
            // Validação dos campos obrigatórios
            if (!titulo || !autor) {
                return res.status(400).json({ error: 'Título e autor são obrigatórios' });
            }

            const livro = {
                titulo,
                autor,
                contato,
                endereco,
                descricao,
                imagem,
                usuario_id: req.usuarioId // Usando o ID do usuário autenticado
            };

            const result = await service.create(livro);
            res.status(201).json({
                message: 'Livro criado com sucesso',
                id: result.insertId
            });
        } catch (error) {
                        res.status(500).json({ error: 'Erro ao criar livro' });
        }
    },

    getAll: async (req, res) => {
        try {
            const livros = await service.getAll();
            res.json(livros);
        } catch (error) {
                        res.status(500).json({ error: 'Erro ao buscar livros' });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const livro = await service.getById(id);
            
            if (livro) {
                res.json(livro);
            } else {
                res.status(404).json({ message: 'Livro não encontrado' });
message                 }
        } catch (error) {
                        res.status(500).json({ error: 'Erro ao buscar livro' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { titulo, autor, contato, endereco, descricao, imagem } = req.body;

            // Validação dos campos obrigatórios
            if (!titulo || !autor) {
                return res.status(400).json({ error: 'Título e autor são obrigatórios' });
            }

            const livro = {
                titulo,
                autor,
                contato,
                endereco,
                descricao,
                imagem,
                usuario_id: req.usuarioId // Usando o ID do usuário autenticado
            };

            const result = await service.update(id, livro);
            
            if (result.affectedRows > 0) {
                res.json({ message: 'Livro atualizado com sucesso' });
            } else {
                res.status(404).json({ error: 'Livro não encontrado ou não autorizado' });
            }
        } catch (error) {
                        res.status(500).json({ error: 'Erro ao atualizar livro' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario_id = req.usuarioId; // Usando o ID do usuário autenticado
            
            const result = await service.delete(id, usuario_id);
            
            if (result.affectedRows > 0) {
                res.json({ message: 'Livro deletado com sucesso' });
            } else {
                res.status(404).json({ error: 'Livro não encontrado ou você não tem permissão para deletá-lo' });
            }
        } catch (error) {
            console.error('Erro ao deletar livro:', error);
            res.status(500).json({ error: 'Erro ao deletar livro' });
        }
    }
};

module.exports = livroController;