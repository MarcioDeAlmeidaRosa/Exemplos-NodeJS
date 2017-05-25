//para usar m�dulo nativo ou instalado via npm, para usar somente "require" e o nome do m�dulo "express"
var express = require('express');
var app = express();


//Configura��o necess�rio para usar o express, sempre faze-las antes das rotas.
//Carrega a depend�ncia que nos dar� acesso ao body da mensagem
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());


//metodo para sobrescrever os metodos do http, assim funcionar� o metodo PUT/DELETE, n�o s� o GET/POST
var methodOverride = require('method-override');
// override with different headers; last one takes precedence
app.use(methodOverride('X-HTTP-Method'));          // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override'));      // IBM
// override with POST having ?_method=DELETE
app.use(methodOverride('_method')); //Usado para form html


//DECLARAR TODAS AS CONFIGURA��ES ANTES DE CONFIGURAR AS ROTAS




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
    console.log('Servi�o esta rodando OK. Aguardando requests...');
    //console.log('Example app listening at http://%s:%s', host, port);
});