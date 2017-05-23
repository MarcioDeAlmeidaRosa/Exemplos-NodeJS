//busca referencia da dep
var express = require('express');

var config = require('./config');

//cria uma app express no app.js
var app = express();

//definindo rota
//req --> request
//res --> response
app.get('/', function(req , res){
    //res.send('Olá mundo');
    res.json({'string':'Olá mundo'});
});

app.post('/', function(req, res){

});

//definindo porta
app.listen(config.port, function(){
    console.log('Iniciou');
});