var ProductsModel = require('../model/ProductsModel');

function ProductsController(Model) {
    this.Model = Model;
};

ProductsController.prototype.findAll = function (req, res) {
    //Recupera o payload enviado no request
    var data = req.body;
    //Envia ara o model gravar o jason
    this.Model.findAll(function (err, result) {
        console.log(err, result);
        res.json(result);
    });
};

ProductsController.prototype.findOne = function (req, res) {
    //Recupera o payload enviado no request
    var _id = req.params._id;
    //--
    console.log('Controller-> findOne -> _id -> ' + _id);
    //Envia ara o model gravar o jason
    this.Model.findOne(_id, function (err, result) {
        res.json(result);
    });
};

ProductsController.prototype.create = function(req, res) {
    //Recupera o payload enviado no request
    var data = req.body;
    //--
    console.log('Controller-> create -> data -> ' + data);
    //Envia ara o model gravar o jason
    this.Model.create(data, function (err, result) {
        console.log(err, result);
        res.json(result);
    });
};

ProductsController.prototype.update = function (req, res) {
    //Recupera o payload enviado no request
    var data = req.body,
        _id = req.params._id;
    //--
    console.log('Controller-> update -> _id -> ' + _id + ' data ' + data);
    //Envia ara o model gravar o jason
    this.Model.update(data, _id, function (err, result) {
        console.log(err, result);
        res.json(result);
    });
};

ProductsController.prototype.delete = function (req, res) {
    //Recupera o payload enviado no request
    var _id = req.params._id;
    //--
    console.log('Controller-> findOne -> _id -> ' + _id);
    //Envia ara o model gravar o jason
    this.Model.delete(_id, function (err, result) {
        console.log(err, result);
        res.json(result);
    });
};

module.exports = new ProductsController(ProductsModel);