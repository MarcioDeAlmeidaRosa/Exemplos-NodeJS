let halk = require('chalk');
let path = require('path');
let express = require('express');

let config = require('./config');

//Variável que vai armazenar configurações globais da app
global = {};
global.config = config;

let db = require('./db');
db.start();

const app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

let apiRoutes = require('./bot/api');
app.use('/api/bot', apiRoutes);

app.listen(config.port);

console.log(halk.blue("Serviço OK, aguardando requisição"));