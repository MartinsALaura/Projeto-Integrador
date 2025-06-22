# Projeto-Integrador
Projeto desenvolvido para a disciplina Projeto Integrador - Portal Web no Técnologo de Sistemas para Internet da Unisinos. O projeto trata-se de um portal para doação de livros.

## Setup do projeto

### Banco de dados

1. instale o mysql v8.0.42.
2. rode o script `create_database.sql` na pasta database para criar o banco de dados (`mysql -u root -p < create_database.sql`)
3. Ainda na pasta database rode para popular o banco de dados: `mysql -u root -p < populate_database.sql`
4. Exibir banco de dados criado: `mysql -u root -p projeto_integrador_doacao_livros -e "SELECT * FROM usuarios; SELECT id, titulo, autor, contato, endereco FROM livros;"`

### backend API
1. Instale o npm -> sudo apt install nodejs npm
2. Na pasta backend instale as dependências: `npm install`
3. No arquivo backend/src/config/database.js preencha com as credenciais do banco.
4. Para rodar a API, entre na pasta backend e rode no terminal o comando `npm run dev`
5. Teste a conexão usando o health endpoint usando curl (`curl http://localhost:3000/api/health`) ou postman.

### frontend
1. Instale as dependências usando `npm install`.
2. Rode `npm start`.