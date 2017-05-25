var express = require('express');
var app = express();

//Movido o carregamento de rotas para dentro do arquivo ./routers/index.js
//assim é alterado somente um logar para adicionar novos arquivos de rota
//conforme a aplicação vai crescendo
var routers = require('./routers');
app.use('/', routers);


var server = app.listen(3000, function () {
    //var host = server.address().address;
    //var port = server.address().port;
    console.log('Example app listening run');
    //console.log('Example app listening at http://%s:%s', host, port);
});