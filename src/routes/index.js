
/*
- Nesse arquivo criaremos o ponto de entrada para as rotas da aplicação;
*/

import express from 'express';
import livros from './livrosRoutes.js';
import autores from './autorRoutes.js';


const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send ("Projeto API em Node.js"));

    app.use(express.json(), livros, autores);
};

export default routes;

// FIM DO ARQUIVO index.js