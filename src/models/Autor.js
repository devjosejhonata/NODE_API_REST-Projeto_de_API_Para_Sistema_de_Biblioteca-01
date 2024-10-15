
/*
- Aqui é onde criamos o modelo de dados do Autor.
- Cada livro tem um autor, então é importante que o autor seja um modelo de dados separado.
- O modelo do Autor contém os campos que serão cadastrados no banco de dados.
- O modelo do Autor será exportado para ser usado em outros arquivos.
- O modelo sera usado baseado nos metodos do mongoose.
*/

import mongoose from 'mongoose';

const autorSchema = new mongoose.Schema({ 
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    nacionalidade: { type: String },
}, {versionKey: false});

const autor = mongoose.model('autores', autorSchema);

export { autor, autorSchema };

// FIM DA PAGINA Autor.js