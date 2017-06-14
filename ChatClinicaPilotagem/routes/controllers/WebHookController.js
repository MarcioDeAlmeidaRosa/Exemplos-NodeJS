console.log("Execuntando routes/controllers/WebHookController.js - carregando a classe....");
let halk = require('chalk');
let request = require('request');

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
                        this.trataMensgem(event);
                    }
                });
            });
        }
        res.sendStatus(200);
    }

    trataMensgem(event) {
        console.log('event = ' + halk.yellow(JSON.stringify(event)));
        console.log(event.message);
        let senderID = event.sender.id; //id do usuário do face que mandou a mensagem
        let recipientID = event.recipient.id; //id da página que hospeda o chat
        let timestamp = event.timestamp; //horário que foi postada a mensagem
        let message = event.message.text; //mensagem de texto enviada pelo usuário

        console.log("Mensagem recebida do usuário %d pela página %d", senderID, recipientID);

        if (message) {
            switch (message) {
                case "oi":
                    //responder outro oi
                    SendTextMessage(recipientID, "oi");
                    break;

                case "tchau":
                    // responder outro tchau
                    SendTextMessage(recipientID, "tchau");
                    break;
                default:
                    // responder que não entende o texto
                    SendTextMessage(recipientID, "não antendi o que você digitou");
                    break;

            }
        }

    }


}

function callsendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: 'EAAIVXVLEfjIBAHxuGAihnQVbIYuC8ZBu8nvASAZAZClPTbcN0bvKmJLkG9A9TZCMVnKxg1fR86TgDFWtHtynPhSbWoo42fuCAgnSU7CZAw9e6yrafFZBXgISkFMwhS14Rb3CdDi1qlqwHIQ2lOflT2YEbjj3V4rmlM5npZBMItTegZDZD' },
        method: 'POST',
        json: messageData
    }, function(error, response, body) {
        if (error) {
            console.log("Erro ao tentar enviar mensagem %d", error);
            return;
        }
        console.log("Retorno da chamada %d", response.statusCode);
        if (response.statusCode == 200) {
            let recipientID = body.recipient_id;
            console.log("recipientID %d", recipientID);
            let mensageID = body.message_id;
            console.log("Mensagem enviada com sucesso do %d e mensagem %d", recipientID, messageID);
        }
    });
};

function SendTextMessage(recipientID, messageText) {
    let messageData = {
        recipient: {
            id: recipientID
        },
        message: {
            text: messageText
        }
    };
    callsendAPI(messageData);
};

module.exports = WebHookController;