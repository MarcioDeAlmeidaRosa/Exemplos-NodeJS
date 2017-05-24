
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    //res.send('Hello World!');
    res.json({"nome": "Marcio de Almeida Rosa"});
});

app.post('/', function (req, res) {
    res.json({ "status": "OK" });
});

app.get('/products', function (req, res) {
    res.json([
        { "name": "Wine" , "price": 20.00},
        { "name": "Bear" },
        { "name": "Car" },
        { "name": "Phone" }
    ]);
});

//:_id --> indica que é um parâmetro
app.get('/products/:_id', function (req, res) {
    console.log('Parâmetros request --> ');
    console.log(req.params);
    //--------------
    var _id = parseInt(req.params._id, 10);
    console.log(_id);
    //--------------
    res.json({ "name": "Wine", "price": 20.00, "_id": _id });
});

app.post('/products', function (req, res) {
    res.status(201).json({ "mensagem": "Criado com sucesso" });
});

app.put('/products/:_id', function (req, res) {
    console.log('Parâmetros request --> ');
    console.log(req.params);
    //--------------
    var _id = parseInt(req.params._id, 10);
    console.log(_id);
    //----------------
    res.json({ "mensagem": "Atualizado com sucesso" });
});

app.delete('/products/:_id', function (req, res) {
    console.log('Parâmetros request --> ');
    console.log(req.params);
    //--------------
    var _id = parseInt(req.params._id, 10);
    console.log(_id);
    //----------------
    res.json({ "mensagem": "Removido com sucesso" });
});


var server = app.listen(3000, function () {
    //var host = server.address().address;
    //var port = server.address().port;
    console.log('Example app listening run');
    //console.log('Example app listening at http://%s:%s', host, port);
});