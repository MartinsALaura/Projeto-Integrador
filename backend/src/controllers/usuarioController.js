const usuarioService = require('../services/user.service');

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
            const resultado = await usuarioService.autenticar(email, senha);
            res.json(resultado);
        } catch (erro) {
            if (erro.message === 'Usuário não encontrado' || erro.message === 'Senha incorreta') {
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
    }
};

module.exports = usuarioController;