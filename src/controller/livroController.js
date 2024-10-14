
/*
- Nesse arquivo conterá a lógica que está relacionada às ações que podem ser feitas em um livro, requições e respostas;
- Nesse arquivo contera uma classe com varios metodos pra cada operação que pode ser feita em um livro;
*/

import livro from '../models/livro.js';


class LivroController {
    
    //metodo para buscar todos os livros
    static async listarLivros (req, res) {
        const listaLivros = await livro.find({});
        res.status(200).json(listaLivros);
    }
    
    //Controller para o metodo POST
    static async cadastrarLivro (req, res) {
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({mensagem: "Livro cadastrado com sucesso", livro: novoLivro});
        } catch (error) {
            res.status(500).json({mensagem: `${error.message} - Falha ao cadastrar livro`});
        }
    }
};

export default LivroController;

//FIM DO ARQUIVO livroController.js