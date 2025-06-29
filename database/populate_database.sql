USE projeto_integrador_doacao_livros;

-- Criar usuários:
INSERT INTO usuarios (nome, email, senha)
VALUES ('João Silva', 'joao.silva@email.com', '$2a$10$xVtjYUUp9ZzKB3YnyUdEWe4FHyoC0d0WqMxE8HgxW0gYi.e5QmOji'); -- password: senha123

INSERT INTO usuarios (nome, email, senha)
VALUES ('Maria Santos', 'maria.santos@email.com', '$2a$10$xVtjYUUp9ZzKB3YnyUdEWe4FHyoC0d0WqMxE8HgxW0gYi.e5QmOji'); -- password: senha123

INSERT INTO usuarios (nome, email, senha)
VALUES ('Laura Martins', 'lauramartins@gmail.com','$2a$10$xVtjYUUp9ZzKB3YnyUdEWe4FHyoC0d0WqMxE8HgxW0gYi.e5QmOji'); -- password: senha123

-- Criar livros:
INSERT INTO livros (titulo, autor, contato, endereco, descricao, imagem, usuario_id)
VALUES ('Um gato de rua chamado Bob', 'James Bowen', '(12) 34567-8912', 'Estância Velha - RS', 'Livro em ótimo estado. Trabalhadores lotam as ruas de Covent Garden, em Londres, enquanto um simpático gatinho laranja chama a atenção da multidão. Com um vistoso lenço em volta do pescoço, Bob, como é chamado, vive com James Bowen, que toca música pela cidade com seu violão surrado. Mais do que um companheiro de rua, Bob é protagonista da história de superação e da luta contra as drogas de seu dono.', 
(SELECT UNHEX(HEX(LOAD_FILE('/var/lib/mysql-files/gato.jpg')))), 3);

INSERT INTO livros (titulo, autor, contato, endereco, descricao, imagem, usuario_id)
VALUES ('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', '(11) 98765-4321', 'São Paulo - SP', 'Clássico da literatura mundial, O Pequeno Príncipe é uma história encantadora que fala sobre a importância de ver com o coração.',
(SELECT UNHEX(HEX(LOAD_FILE('/var/lib/mysql-files/O-pequeno-príncipe.jpg')))), 2);

INSERT INTO livros (titulo, autor, contato, endereco, descricao, imagem, usuario_id)
VALUES ('As Crônicas de Nárnia', 'C.S. Lewis', '(51) 98765-4321', 'Porto Alegre - RS', 'Coleção completa em capa dura, todos os 7 livros em excelente estado de conservação. Uma obra-prima da literatura fantástica que narra as aventuras no mundo mágico de Nárnia.', 
(SELECT UNHEX(HEX(LOAD_FILE('/var/lib/mysql-files/narnia.webp')))), 1);

INSERT INTO livros (titulo, autor, contato, endereco, descricao, imagem, usuario_id)
VALUES ('1984', 'George Orwell', '(51) 91234-5678', 'Canoas - RS', 'Livro em bom estado. Um clássico distópico que retrata um futuro totalitário. Algumas anotações a lápis nas margens que podem ser apagadas.', 
(SELECT UNHEX(HEX(LOAD_FILE('/var/lib/mysql-files/1984.jpg')))), 2);

INSERT INTO livros (titulo, autor, contato, endereco, descricao, imagem, usuario_id)
VALUES ('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', '(51) 94567-8901', 'São Leopoldo - RS', 'Primeira edição em português, livro em estado impecável. O início da jornada mágica de Harry Potter em Hogwarts.', 
(SELECT UNHEX(HEX(LOAD_FILE('/var/lib/mysql-files/harry_potter.jpg')))), 3);

