var mongojs = require('mongojs');

var connectionString = 'mongodb://admin:n9mehu7HYWgG06YP@cluster0-shard-00-00-okd4p.mongodb.net:27017,cluster0-shard-00-01-okd4p.mongodb.net:27017,cluster0-shard-00-02-okd4p.mongodb.net:27017/PRIMEIRO-USO-NODE?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
var db = mongojs(connectionString, ['products']);

//var db = mongojs('mongodb://admin:n9mehu7HYWgG06YP@cluster0-shard-00-00-okd4p.mongodb.net:27017,cluster0-shard-00-01-okd4p.mongodb.net:27017,cluster0-shard-00-02-okd4p.mongodb.net:27017/PRIMEIRO-USO-NODE?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', ['products']);


module.exports = db;