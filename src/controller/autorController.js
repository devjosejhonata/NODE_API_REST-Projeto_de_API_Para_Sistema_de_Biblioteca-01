
/*
- Este arquivo é responsável por controlar as requisições feitas para a rota de autores;
- Neste arquivo, é feita a importação do modelo de autor, que contém o schema do autor;
- Neste arquivo, é criada uma classe chamada AutorController, que contém métodos para listar 
todos os autores, listar um autor por ID, cadastrar um autor, atualizar um autor e excluir um autor;
*/

import mongoose from 'mongoose';
import { autor } from '../models/Autor.js';


class AutorController {
    
    //metodo para buscar todos os autores
    static async listarAutores (req, res) {
        try {

            // Define limite e página padrão
            let { limite = 5, pagina = 1 } = req.query;

            // Converte limite e página para números inteiros
            limite = parseInt(limite);
            pagina = parseInt(pagina);

            // Valida se os parâmetros são números positivos
            if (isNaN(limite) || limite <= 0 || isNaN(pagina) || pagina <= 0) {
                return res.status(400).json({ message: "Limite e página devem ser números positivos." });
            }

            // Contagem total de documentos
            const totalAutores = await autor.countDocuments({});
            const totalPaginas = Math.ceil(totalAutores / limite);

            // Verifica se a página solicitada existe
            if (pagina > totalPaginas) {
                return res.status(404).json({ message: "Página não encontrada." });
            }

            // Busca os autores com paginação
            const listaAutores = await autor.find({}).skip((pagina - 1) * limite).limit(limite);

            // Retorna a página atual, o total de páginas e o total de autores
            res.status(200).json({
                autores: listaAutores,
                paginaAtual: pagina,
                totalPaginas: totalPaginas,
                totalAutores: totalAutores
            });
            
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    }

    //metodo para buscar um autor pelo id, GET
    static async listarAutorPorID (req, res) {
        try {
            const id = req.params.id;

            // Valida se o ID fornecido é válido no formato MongoDB
            // Verificação se o ID é válido usando o método do Mongoose
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const autorEncontrado = await autor.findById(id);

            // Verifica se o autor foi encontrado
            if (!autorEncontrado) {
                return res.status(404).json({ message: "Autor não encontrado" });
            }

            res.status(200).json(autorEncontrado);

        } catch (erro) {
            // Caso o erro seja interno no servidor (falha de conexão, etc.)
            res.status(500).json({ message: `${erro.message} - Erro interno no servidor` });
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