//para usar módulo nativo ou instalado via npm, para usar somente "require" e o nome do módulo "express"
var express = require('express');
var app = express();

//Movido o carregamento de rotas para dentro do arquivo ./routers/index.js
//assim é alterado somente um logar para adicionar novos arquivos de rota
//conforme a aplicação vai crescendo
//para usar móduos que nós escrevemos usar "require" junto com "./" 
//para não sei procurado de "node_modules do projeto ou da maquina"
//sendo assim, será procurado por um arquivo chamado "routers.js" ou uma pasta "routers"
//ou usar da seguinte forma './routers/index'
var routers = require('./routers');
app.use('/', routers);


var server = app.listen(3000, function () {
    //var host = server.address().address;
    //var port = server.address().port;
    console.log('Example app listening run');
    //console.log('Example app listening at http://%s:%s', host, port);
});