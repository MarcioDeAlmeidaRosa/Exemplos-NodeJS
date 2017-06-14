console.log("Iniciando server clínica de pilotagem.... carregando chalk");
let halk = require('chalk');
let express = require('express');
console.log(halk.green("executando express.Router()"));
let router = express.Router();
console.log(halk.green("carregando path"));
let path = require('path');

console.log("Endereço raiz do app: " + halk.green(path.resolve()));
console.log(halk.green("carregando WebHookController"));
const webHookController = require(path.resolve('./routes/controllers/WebHookController'));

// router.get('/', webHookController.get);
// router.post('/', webHookController.add);

// console.log(halk.blue("Configurando a rota inicial do serviço"));
router.get('/', function(req, res) {
    res.send("Serviço funcionando");
});

module.exports = router;