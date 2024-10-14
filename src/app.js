
/*
- Dentro desse arquivo iniciaremos toda a parte do framework express, gerenciar as rotas e servidor http;
- Dentro desse arquivo também faremos a conexão com o banco de dados;
*/

import express from 'express';
import conectaNaDataBase from './config/dbConnect.js';
import routes from './routes/index.js';

const app = express();
routes(app);

// Conexão com o banco de dados
const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => {
    console.error("Erro ao conectar ao banco de dados", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco de dados realizada com sucesso");
});


app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro removido com sucesso");
});

export default app;

//fim da pagina