
/*
- Este arquivo é responsável por controlar as requisições feitas para a rota de autores;
- Neste arquivo, é feita a importação do modelo de autor, que contém o schema do autor;
- Neste arquivo, é criada uma classe chamada AutorController, que contém métodos para listar 
todos os autores, listar um autor por ID, cadastrar um autor, atualizar um autor e excluir um autor;
*/

import autor from '../models/Autor.js';


class AutorController {
    
    //metodo para buscar todos os autores
    static async listarAutores (req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    }

    //metodo para buscar um autor pelo id, GET
    static async listarAutorPorID (req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do autor` });
        }
    }
    
    //Metodo para cadastrar novo autor, POST    
    static async cadastrarAutor (req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({mensagem: "Autor cadastrado com sucesso", autor: novoAutor});
        } catch (error) {
            res.status(500).json({mensagem: `${error.message} - Falha ao cadastrar Autor`});
        }
    }

    //Metodo para editar um autor, PUT
    static async atualizarAutor (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({mensagem: "Autor atualizado com sucesso"});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização` });
        }
    }

    //Metodo para deletar um autor, DELETE
    static async excluirAutor (req, res) {
        try {
          const id = req.params.id;
          await autor.findByIdAndDelete(id);
          res.status(200).json({ message: "Autor excluído com sucesso" });
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha na exclusão` });
        }
    };
};

export default AutorController;

//FIM DO ARQUIVO autorController.js