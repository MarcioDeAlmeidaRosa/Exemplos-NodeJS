var mongo = require('../DB/mongo');

function ProductsModel() {

}

ProductsModel.prototype.findAll = function (callback) {
    console.log('Model-> findAll -> ');
    mongo.collection('products').find({}, callback);
};

ProductsModel.prototype.findOne = function (_id, callback) {
    console.log('Model-> findOne -> _id -> ' + _id);
    mongo.collection('products').findOne({ "_id": mongo.ObjectId(_id)}, callback);
};

ProductsModel.prototype.create = function (data, callback) {
    console.log('Model-> save -> data -> ' + data);
    mongo.collection('products').save(data, callback);
};

ProductsModel.prototype.update = function (data, _id, callback) {
    console.log('Model-> update -> data -> ' + data);
    mongo.collection('products').update({ "_id": mongo.ObjectId(_id) }, data, callback);
};

ProductsModel.prototype.delete = function (_id, callback) {
    console.log('Model-> delete -> _id -> ' + _id);
    mongo.collection('products').remove({ "_id": mongo.ObjectId(_id) }, callback);
};
module.exports = new ProductsModel();