
/*
- Arquivo de rotas para o recurso autores
*/

import express from 'express';
import AutorController from '../controller/autorController';

const routes = express.Router();

// Rotas chamando os metodos do controller, para o recurso autores
// GET, POST, PUT, DELETE
routes.get('/autores', AutorController.listarAutores);
routes.get('/autores/:id', AutorController.listarAutorPorID);
routes.post('/autores', AutorController.cadastrarAutor);
routes.put('/autores/:id', AutorController.atualizarAutor);
routes.delete("/autores/:id", AutorController.excluirAutor);

export default routes;

// FIM DO ARQUIVO autorRoutes.js