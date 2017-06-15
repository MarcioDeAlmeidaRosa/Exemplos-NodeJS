let path = require('path');
let facebookConfig = require(path.resolve('./config/facebook'));

module.exports = {
    port: process.env.PORT_NUMBER || 3000,
    facebook: facebookConfig
};