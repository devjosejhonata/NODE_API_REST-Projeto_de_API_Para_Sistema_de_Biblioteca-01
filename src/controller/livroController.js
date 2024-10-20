
/*
- Nesse arquivo conterá a lógica que está relacionada às ações que podem ser feitas em um livro, requições e respostas;
- Nesse arquivo contera uma classe com varios metodos pra cada operação que pode ser feita em um livro;
*/

import livro from '../models/Livro.js';
import { autor } from '../models/Autor.js';
import mongoose from 'mongoose';


class LivroController {

    // Método para converter a data, utilizado em atualizar livro e cadastrar livro
    static converterData(dataString) {
        const [dia, mes, ano] = dataString.split('/'); // Divide a string em dia, mês e ano
        return new Date(ano, mes - 1, dia); // Cria um novo objeto Date
    }
    
    //metodo para buscar todos os livros
    static async listarLivros (req, res) {
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
            const totalLivros = await livro.countDocuments({});
            const totalPaginas = Math.ceil(totalLivros / limite);
    
            // Verifica se a página solicitada existe
            if (pagina > totalPaginas) {
                return res.status(404).json({ message: "Página não encontrada." });
            }
    
            // Busca os livros com paginação
            const listaLivros = await livro
                .find({})
                .sort({ dataAdicao: -1, titulo: 1 }) // Ordena por data de adição (mais recente primeiro) e título (alfabeticamente)
                .skip((pagina - 1) * limite)
                .limit(limite);
            
            // Retorna a página atual, o total de páginas e o total de livros
            res.status(200).json({
                livros: listaLivros,
                paginaAtual: pagina,
                totalPaginas: totalPaginas,
                totalLivros: totalLivros
            });
    
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição` });
        }
    }

    //metodo para buscar um livro pelo id, GET
    static async listarLivroPorID (req, res) {
        try {
            const id = req.params.id;
    
            // Verificação se o ID é válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID do livro inválido" });
            }
    
            const livroEncontrado = await livro.findById(id);
    
            // Verificação se o livro foi encontrado
            if (!livroEncontrado) {
                return res.status(404).json({ message: "Livro não encontrado" });
            }
    
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            // Tratamento de erro interno no servidor
            res.status(500).json({ message: `${erro.message} - Erro interno no servidor` });
        }
    }
    
    //Metodo para cadastrar novo livro, POST    
    static async cadastrarLivro (req, res) {

        const novoLivro = req.body;

        try {

            // Verifica se dataAdicao está presente nos dados e faz a conversão
            if (novoLivro.dataAdicao) {
                novoLivro.dataAdicao = LivroController.converterData(novoLivro.dataAdicao);
            }

            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            
            res.status(201).json({mensagem: "Livro cadastrado com sucesso", livro: livroCriado});
        } catch (error) {
            res.status(500).json({mensagem: `${error.message} - Falha ao cadastrar livro`});
        }
    }

    // Método para editar um livro, PUT
    static async atualizarLivro(req, res) {
        try {
            const id = req.params.id;
            const dadosAtualizados = req.body;

            // Verifica se dataAdicao está presente nos dados e faz a conversão
            if (dadosAtualizados.dataAdicao) {
                dadosAtualizados.dataAdicao = LivroController.converterData(dadosAtualizados.dataAdicao); // Use o nome da classe para chamar o método
            }

            await livro.findByIdAndUpdate(id, dadosAtualizados);
            res.status(200).json({ mensagem: "Livro atualizado com sucesso" });
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
    
    //Metodo para buscar livro por parametro, no caso Editora
    //testando essa funcionalidade
    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na busca` });
        }
    }
};

export default LivroController;

//FIM DO ARQUIVO livroController.js