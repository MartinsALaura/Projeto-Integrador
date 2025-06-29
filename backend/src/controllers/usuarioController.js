const usuarioService = require('../services/usuario.service');

const usuarioController = {
    async cadastrar(req, res) {
        try {
            const dadosUsuario = req.body;
            const usuario = await usuarioService.criar(dadosUsuario);
            res.status(201).json({
                mensagem: 'Usuário criado com sucesso',
                usuario
            });
        } catch (erro) {
            if (erro.message === 'Email já cadastrado') {
                return res.status(400).json({ erro: erro.message });
            }
            res.status(500).json({ erro: 'Erro ao criar usuário' });
        }
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const resultado = await usuarioService.authenticate(email, senha);
            res.json(resultado);
        } catch (erro) {
            if (erro.message === 'Login ou senha incorretos') {
                return res.status(401).json({ erro: erro.message });
            }
            res.status(500).json({ erro: 'Erro ao fazer login' });
        }
    },

    async verificarEmail(req, res) {
        try {
            const { email } = req.query;
            const usuario = await usuarioService.buscarPorEmail(email);
            res.json({ existe: !!usuario });
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao verificar email' });
        }
    },

    async getLivrosByUsuario(req, res) {
        try {
            const { usuarioId } = req.params;
            const livros = await require('../services/livro.service').getByUsuarioId(usuarioId);
            
            // Convert buffer to base64 string for images
            const livrosWithBase64Images = livros.map(livro => ({
                ...livro,
                imagem: livro.imagem ? `data:image/jpeg;base64,${livro.imagem.toString('base64')}` : null
            }));
            
            res.json(livrosWithBase64Images);
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao buscar livros do usuário' });
        }
    }
};

module.exports = usuarioController;