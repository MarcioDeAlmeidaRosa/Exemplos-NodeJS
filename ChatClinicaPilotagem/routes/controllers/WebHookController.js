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

    message(req, res) {
        console.log(halk.yellow("executandod WebHookController.message"));
        let data = req.body;
        console.log('req.body = ' + halk.yellow(JSON.stringify(data)));
        console.log('req.query = ' + halk.yellow(JSON.stringify(req.query)));
        //o face usar a propriedade object dentro do 
        //body para mandar as mensagens
        console.log(halk.yellow("verificando se a mensagem é do facebook"));
        if ((data) && (data.object) && (data.object === 'page')) {
            console.log(halk.yellow("percorrendo as mensagens e chamando arrow functions para ler a mensagem"));
            data.entry.forEach((entry) => {
                console.log(halk.yellow("recuperando o id da página " + entry.id + " hora " + entry.time));
                let pageId = entry.id;
                let timeOfEvent = entry.time;
                console.log(halk.yellow("percorrendo todas as mensagens enviadas"));
                entry.messaging.forEach((event) => {
                    console.log(halk.yellow("verificando se na mensagem enviada tem a propriedade mensagem"));
                    if (event.message) {
                        console.log(event.message);
                    }
                });
            });
        }
        res.sendStatus(200);
    }
}

module.exports = WebHookController;