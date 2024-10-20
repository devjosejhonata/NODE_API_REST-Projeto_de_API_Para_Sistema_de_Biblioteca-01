
/*
- Dentro desse arquivo conterá o modelo para qualquer livro que será cadastrado no banco de dados.
- O modelo do livro contém os campos que serão cadastrados no banco de dados.
- O modelo do livro será exportado para ser usado em outros arquivos.
- O modelo sera usado baseado nos metodos do mongoose.
*/

import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

//criando as propriedades que o livro terá
const livroSchema = new mongoose.Schema({ //criando o schema do livro
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    editora: { type: String, required: true  },
    preco: { type: Number, required: true },
    paginas: { 
        type: Number, 
        min: [10, "O livro deve ter entre 10 e 1000 páginas"], 
        max: [1000, "O livro deve ter entre 10 e 1000 páginas"],
        required: true   
    }, 
    autor: autorSchema, 
    dataAdicao: { type: Date, default: Date.now }
    
}, {versionKey: false}); //removendo a versão do documento

// Altera o formato da data de adição do livro
// Formata a data para o padrão brasileiro
livroSchema.set('toJSON', {
    transform: (doc, ret) => {
        // Formata a data apenas para exibição
        if (ret.dataAdicao) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            ret.dataAdicao = new Date(ret.dataAdicao).toLocaleDateString('pt-BR', options);
        }
        return ret;
    }
});

const livro = mongoose.model ("livros", livroSchema); //fechando o modelo do livro

export default livro; //exportando o modelo do livro

// FIM DA PAGINA livro.js