
/* Nesse arquivo conterá o Servidor HTTP da aplicação */
/* Foi criado um servidor local que simula um servidor na internet fornecendo as informações */

import HTTP from 'http';

const PORT = 3000;

const server = HTTP.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end("Desafio para formação de criação de apis em node");
});

server.listen(PORT, () => {
  console.log('Servidor rodando na porta 3000');
});



/*FIM DA PAGINA*/