
/*
- Dentro desse arquivo iniciaremos toda a parte do framework express, gerenciar as rotas e servidor http
*/

import express from 'express';

const app = express();

const livros = [ 
    //dados teste para criar a rota livros, criarei a base de dados em outro lugar
    {
        id: 1,
        título: "O Senhor dos Anéis"
    },
    {
        id: 2,
        título: "O Hobbit"
    }
];

app.get('/', (req, res) => {
    res.status(200).send('Desafio para formação de criação de apis em node');
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
  });

export default app;

//fim da pagina