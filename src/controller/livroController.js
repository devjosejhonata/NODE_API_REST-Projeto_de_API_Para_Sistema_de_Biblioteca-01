
/*
- Nesse arquivo conterá a lógica que está relacionada às ações que podem ser feitas em um livro, requições e respostas;
- Nesse arquivo contera uma classe com varios metodos pra cada operação que pode ser feita em um livro;
*/

import livro from '../models/livro.js';
import { autor } from '../models/Autor.js';


class LivroController {
    
    //metodo para buscar todos os livros
    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    }

    //metodo para buscar um livro pelo id, GET
    static async listarLivroPorID (req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
        }
    }
    
    //Metodo para cadastrar novo livro, POST    
    static async cadastrarLivro (req, res) {

        const novoLivro = req.body;

        try {

            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            
            res.status(201).json({mensagem: "Livro cadastrado com sucesso", livro: livroCriado});
        } catch (error) {
            res.status(500).json({mensagem: `${error.message} - Falha ao cadastrar livro`});
        }
    }

    //Metodo para editarr um livro, PUT
    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({mensagem: "Livro atualizado com sucesso"});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização` });
        }
    }

    //Metodo para deletar um livro, DELETE
    static async excluirLivro (req, res) {
        try {
          const id = req.params.id;
          await livro.findByIdAndDelete(id);
          res.status(200).json({ message: "livro excluído com sucesso" });
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha na exclusão` });
        }
    };
};

export default LivroController;

//FIM DO ARQUIVO livroController.js