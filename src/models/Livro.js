
/*
- Dentro desse arquivo conterá o modelo para qualquer livro que será cadastrado no banco de dados.
- O modelo do livro contém os campos que serão cadastrados no banco de dados.
- O modelo do livro será exportado para ser usado em outros arquivos.
- O modelo sera usado baseado nos metodos do mongoose.
*/

import mongoose from "mongoose";

//criando as propriedades que o livro terá
const livroSchema = new mongoose.Schema({ //criando o schema do livro
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number }
    
}, {versionKey: false}); //removendo a versão do documento

const livro = mongoose.model ("livros", livroSchema); //fechando o modelo do livro

export default livro; //exportando o modelo do livro

// FIM DA PAGINA livro.js