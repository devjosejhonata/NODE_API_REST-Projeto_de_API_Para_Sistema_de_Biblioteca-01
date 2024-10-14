
/*
- Aqui é onde definimos as rotas para o recurso livros.
*/

import express from 'express';
import LivroController from '../controller/livroController.js';

const routes = express.Router();

// Rotas chamando os metodos do controller, para o recurso livros
// GET, POST, PUT, DELETE
routes.get('/livros', LivroController.listarLivros);
routes.get('/livros/:id', LivroController.listarLivroPorID);
routes.post('/livros', LivroController.cadastrarLivro);
routes.put('/livros/:id', LivroController.atualizarLivro);

export default routes;

// FIM DO ARQUIVO livrosRoutes.js