let express = require('express');
let halk = require('chalk');

console.log(halk.blue("Iniciando server clínica de pilotagem...."));


console.log(halk.blue("Criando instância com express"));
const app = express();

console.log(halk.blue("Configurando a rota inicial do serviço"));
app.get('/', function(req, res) {
    res.send("Serviço funcionando");
});

console.log(halk.blue("Configurando a porta de escuta do serviço"));
app.listen(3000);

console.log(halk.blue("Serviço OK, aguardando requisição"));