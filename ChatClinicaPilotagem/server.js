let halk = require('chalk');
let path = require('path');
let express = require('express');

let config = require('./config');


let EventEmitter = require('events').EventEmitter;

//Variável que vai armazenar configurações globais da app
global = {};
global.bots = [];
global.events = new EventEmitter();
global.config = config;

let db = require('./db');
db.start();

let botLoader = require('./bot/BotLoader');
let apiRoutes = require('./bot/api'); //TODO - PRECISA ESTA LOGO ABAIXO DO CARREGAMENTO DE BOT?
botLoader.loadAll();

console.log(global.events);


const app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use('/api/bot', apiRoutes);

app.listen(config.port);

console.log(halk.blue("Serviço OK, aguardando requisição"));