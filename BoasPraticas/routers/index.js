var express = require('express');
var router = express.Router();

var productsRouter = require('./products.js');
router.use('/', productsRouter);

module.exports = router;