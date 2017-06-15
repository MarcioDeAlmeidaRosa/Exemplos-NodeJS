let path = require('path');
let envirement = require(path.resolve('./config/envirement/dev'));

module.exports = {
    port: process.env.PORT_NUMBER || 3000,
    env: envirement
};