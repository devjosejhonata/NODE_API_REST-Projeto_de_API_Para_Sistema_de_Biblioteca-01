
/*
- Dentro desse arquivo iniciaremos toda a parte do framework express, gerenciar as rotas e servidor http;
- Dentro desse arquivo também faremos a conexão com o banco de dados;
*/

import express from 'express';
import conectaNaDataBase from './config/dbConnect.js';
import livro from './models/livro.js';

const app = express();

// Conexão com o banco de dados
const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => {
    console.error("Erro ao conectar ao banco de dados", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco de dados realizada com sucesso");
});

// Middleware para permitir que o Express faça o parsing de requisições com corpo em JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Desafio para formação de criação de apis em node');
});

// Rotas para manipulação de livros
app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({}); //buscando todos os livros
    res.status(200).json(listaLivros);
});

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});


app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro adicionado com sucesso");
});

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro removido com sucesso");
});

export default app;

//fim da pagina