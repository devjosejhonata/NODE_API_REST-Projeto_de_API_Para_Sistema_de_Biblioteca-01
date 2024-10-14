
/*
- Nesse arquivo conterá a lógica que está relacionada às ações que podem ser feitas em um livro, requições e respostas;
- Nesse arquivo contera uma classe com varios metodos pra cada operação que pode ser feita em um livro;
*/

import livro from '../models/livro.js';

class LivroController {

    static async listarLivros (req, res) {
        const listaLivros = await livro.find({}); //buscando todos os livros
        res.status(200).json(listaLivros);
    }
};

export default LivroController;

//FIM DO ARQUIVO livroController.js