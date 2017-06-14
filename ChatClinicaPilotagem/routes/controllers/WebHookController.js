console.log("Execuntando routes/controllers/WebHookController.js - carregando a classe....");
let halk = require('chalk');

class WebHookController {
    getHook(req, res) {
        console.log(halk.yellow("executandod WebHookController.getHook"));
        console.log('req.body = ' + halk.yellow(JSON.stringify(req.body)));
        console.log('req.query = ' + halk.yellow(JSON.stringify(req.query)));

        if ((req.query["hub.mode"] === "subscribe") && (req.query["hub.verify_token"] === "minhasenha123")) {
            console.log('Validação webhook ok');
            res.status(200).send(req.query["hub.challenge"]);
        } else {
            console.log('Validação webhook falha');
            res.sendStatus(403);
        }
    }

    add(req, res) {
        console.log(halk.yellow("executandod WebHookController.add"));
        res.send("OK");
    }
}

module.exports = WebHookController;