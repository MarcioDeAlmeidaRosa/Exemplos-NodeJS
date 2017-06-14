console.log("Execuntando server.js - Iniciando server clínica de pilotagem....");
let halk = require('chalk');
console.log(halk.blue("carregado chalk"));

console.log(halk.blue("carregando path"));
let path = require('path');
console.log("Endereço raiz do app: " + halk.blue(path.resolve()));

console.log(halk.blue("carregando express"));
let express = require('express');

console.log(halk.blue("carregando config"));
let config = require('./config');

console.log(halk.blue("Criando instância com express"));
const app = express();

console.log(halk.blue("carregando body-parser"));
let bodyParser = require('body-parser');

console.log(halk.blue("configurando json"));
app.use(bodyParser.json({ limit: '50mb' }));

console.log(halk.blue("configurando urlencoded"));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

console.log(halk.blue("Carregando routes"));
let routes = require('./routes');
app.use('/', routes);

console.log(halk.blue("Configurando a porta de escuta do serviço"));
app.listen(config.port);

console.log(halk.blue("Serviço OK, aguardando requisição"));