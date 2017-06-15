var mongoose = require("mongoose"); // The reason for this demo.

class MongooseStart {
    start() {
        // Makes connection asynchronously.  Mongoose will queue up database
        // operations and release them when the connection is complete.
        //mongoose.Promise = require('bluebird');
        mongoose.connect(global.config.env.db.uri,
            global.config.env.db.options,
            (err, res) => {
                if (err) {
                    console.log('Erro ao conectar ao banco: ' + err);
                } else {
                    console.log('Conexão efetuada com sucesso');
                }
            });
    }
}

module.exports = new MongooseStart();