
/*
- Nesse arquivo usaremos a string de conexão com o MongoDB, mas a 
string de conexao está em outro arquivo, por ser uma parte sensivel.
*/

//chamando a biblioteca mongoose para a conexao com o banco de dados funcionar
import mongoose, { mongo } from "mongoose";

//chamando a string de conexao, dentro de um arquivo separado por ser um conteudo sensivel
import stringDeConexaoBancoMongoDB from "./stringDeConexaoMongoDB.js";

async function conectaNaDataBase() {

    //retornando a função que contém a string de conexao, dentro de um arquivo separado por ser um conteudo sensivel
    //a string de conexao está no arquivo stringDeConexaoMongoDB.js
    stringDeConexaoBancoMongoDB();

    return mongoose.connection;
}

export default conectaNaDataBase;


//FIM DA PAGINA dbConnect.js 