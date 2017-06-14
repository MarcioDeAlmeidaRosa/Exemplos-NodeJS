console.log("Execuntando routes/index.js - carregando chalk....");
let halk = require('chalk');

console.log(halk.green("carregando express"));
let express = require('express');

console.log(halk.green("executando express.Router()"));
let router = express.Router();

console.log(halk.green("carregando path"));
let path = require('path');

console.log(halk.green("carregando WebHookController"));
const WebHookController = require(path.resolve('./routes/controllers/WebHookController'));

console.log(halk.green("instanciando WebHookController"));
let webHookController = new WebHookController();

console.log(halk.green("carregando rota get webHookController.getHook"));
router.get('/fbwebhook', webHookController.getHook);

console.log(halk.green("carregando rota get webHookController.message"));
router.post('/fbwebhook', webHookController.message);

module.exports = router;