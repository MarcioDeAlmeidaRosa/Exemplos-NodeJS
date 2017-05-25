var express = require('express');
var router = express.Router();

////importando o model
//var ProductsModel = new require('../model/ProductsModel');

//importando o controller e injetando o model no controlller
//var ProductsController = new require('../controller/ProductsController')(ProductsModel);
var ProductsController = require('../controller/ProductsController');

console.log('Mapeando rota');

//funculando metodos htttp com o model
router.get('/products', ProductsController.findAll.bind(ProductsController));
router.get('/products/:_id', ProductsController.findOne.bind(ProductsController));
router.post('/products'       , ProductsController.create.bind(ProductsController));
router.put('/products/:_id'   , ProductsController.update.bind(ProductsController));
router.delete('/products/:_id', ProductsController.delete.bind(ProductsController));

//exportando as rodas definidas neste arquivo
module.exports = router;