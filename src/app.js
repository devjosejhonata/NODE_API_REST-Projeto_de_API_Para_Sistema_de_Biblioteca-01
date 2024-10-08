
/*
- Dentro desse arquivo iniciaremos toda a parte do framework express, gerenciar as rotas e servidor http
*/

import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Desafio para formação de criação de apis em node');
});

export default app;

//fim da pagina