let halk = require('chalk');
let path = require('path');
let express = require('express');

let config = require('./config');

const app = express();

let bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

let routes = require('./routes');
app.use('/', routes);

app.listen(config.port);

console.log(halk.blue("Serviço OK, aguardando requisição"));