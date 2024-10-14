
/*
- Aqui é onde definimos as rotas para o recurso livros.
*/

import express from 'express';
import LivroController from '../controller/livroController.js';

const routes = express.Router();

routes.get('/livros', LivroController.listarLivros);

export default routes;

// FIM DO ARQUIVO livrosRoutes.js