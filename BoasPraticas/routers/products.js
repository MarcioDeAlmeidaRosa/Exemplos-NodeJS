var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    //res.send('Hello World!');
    res.json({ "nome": "Marcio de Almeida Rosa" });
});

router.post('/', function (req, res) {
    res.json({ "status": "OK" });
});

router.get('/products', function (req, res) {
    res.json([
        { "name": "Wine", "price": 20.00 },
        { "name": "Bear" },
        { "name": "Car" },
        { "name": "Phone" }
    ]);
});

//:_id --> indica que é um parâmetro
router.get('/products/:_id', function (req, res) {
    console.log('Parâmetros request --> ');
    console.log(req.params);
    //--------------
    var _id = parseInt(req.params._id, 10);
    console.log(_id);
    //--------------
    res.json({ "name": "Wine", "price": 20.00, "_id": _id });
});

router.post('/products', function (req, res) {
    res.status(201).json({ "mensagem": "Criado com sucesso" });
});

router.put('/products/:_id', function (req, res) {
    console.log('Parâmetros request --> ');
    console.log(req.params);
    //--------------
    var _id = parseInt(req.params._id, 10);
    console.log(_id);
    //----------------
    res.json({ "mensagem": "Atualizado com sucesso" });
});

router.delete('/products/:_id', function (req, res) {
    console.log('Parâmetros request --> ');
    console.log(req.params);
    //--------------
    var _id = parseInt(req.params._id, 10);
    console.log(_id);
    //----------------
    res.json({ "mensagem": "Removido com sucesso" });
});

module.exports = router;