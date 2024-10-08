
/* 
- Foi criado um servidor local que simula um servidor na internet fornecendo as informações 
- Importaremos nesse arquivo as configurações do servidor e iniciaremos o servidor http
*/


import app from './src/app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Servidor rodando na porta 3000');
});



/*FIM DA PAGINA*/