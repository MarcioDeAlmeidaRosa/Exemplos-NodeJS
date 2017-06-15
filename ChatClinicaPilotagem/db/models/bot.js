var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var botSchema = new Schema({
    name: String,
    active: Boolean,
    source: String,
    token: String,
    verify: String,
    pageId: String,
    menu: [{
        button: String,
        toStatus: String
    }],
    startStatus: String,
    sessionLimit: Number
});

module.exports = mongoose.model('bot', botSchema);