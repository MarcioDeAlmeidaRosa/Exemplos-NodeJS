//para usar m�dulo nativo ou instalado via npm, para usar somente "require" e o nome do m�dulo "express"
var express = require('express');
var app = express();

//Movido o carregamento de rotas para dentro do arquivo ./routers/index.js
//assim � alterado somente um logar para adicionar novos arquivos de rota
//conforme a aplica��o vai crescendo
//para usar m�duos que n�s escrevemos usar "require" junto com "./" 
//para n�o sei procurado de "node_modules do projeto ou da maquina"
//sendo assim, ser� procurado por um arquivo chamado "routers.js" ou uma pasta "routers"
//ou usar da seguinte forma './routers/index'
var routers = require('./routers');
app.use('/', routers);


var server = app.listen(3000, function () {
    //var host = server.address().address;
    //var port = server.address().port;
    console.log('Example app listening run');
    //console.log('Example app listening at http://%s:%s', host, port);
});