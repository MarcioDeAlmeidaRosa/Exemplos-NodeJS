let halk = require('chalk');
let request = require('request');

class WebHookController {

    add(req, res) {
        console.log("executando metodo add")
        res.send("metodo em construção");
    }

    getWebHook(req, res) {
        //Metodo responsável por efetuar o hook com facebook
        if ((req.query["hub.mode"] === "subscribe") && (req.query["hub.verify_token"] === "minhasenha123")) {
            console.log(halk.green("Validação webhook ok"));
            res.status(200).send(req.query["hub.challenge"]);
        } else {
            console.log(halk.red("Validação webhook falhou"));
            res.sendStatus(403);
        }
    }

    receiverMessage(req, res) {
        let data = req.body;
        //o face usar a propriedade object dentro do 
        //body para mandar as mensagens
        if ((data) && (data.object) && (data.object === 'page')) {
            data.entry.forEach((entry) => {
                let pageId = entry.id;
                let timeOfEvent = entry.time;
                //percorrendo todas as mensagens enviadas
                entry.messaging.forEach((event) => {
                    //verificando se na mensagem enviada tem a propriedade mensagem
                    if (event.message) {
                        trataMensgem(event);
                    }
                });
            });
        }
        res.sendStatus(200);
    }

    setMessageMain(req, res) {
        let data = req.body;
        console.log(data);
        request({
            uri: global.config.facebook.URI_POST_DEFAULT + 'thread_settings',
            qs: { access_token: global.config.facebook.TOKEN_ACCESS_PAGE },
            method: 'POST',
            json: {
                "setting_type": "greeting",
                "greeting": {
                    "text": data.message
                }
            }
        }, function(error, response, body) {
            if (error) {
                console.log("Erro ao tentar configurar a mensagem pedrão %d", error);
                return;
            }

            if (response.statusCode == 200) {
                console.log("Mensagem configurada com sucesso");
            }
        });
        res.status(200).send("Mensagem configurada OK");
    }
}

function trataMensgem(event) {
    let senderID = event.sender.id; //id do usuário do face que mandou a mensagem
    let recipientID = event.recipient.id; //id da página que hospeda o chat
    let timestamp = event.timestamp; //horário que foi postada a mensagem
    let message = event.message.text; //mensagem de texto enviada pelo usuário

    console.log("Mensagem recebida: " + message);

    if (message) {
        switch (message) {
            case "oi":
            case "Oi":
                //responder outro oi
                SendTextMessage(senderID, "Oi, tudo bem com você?");
                break;

            case "tchau":
                // responder outro tchau
                SendTextMessage(senderID, "Tchau, volte sempre.");
                break;
            default:
                // responder que não entende o texto
                SendTextMessage(senderID, "Não antendi sua pergunta, por enquanto só entendo oi e tchau.");
                break;
        }
    }
};

function SendTextMessage(senderID, messageText) {
    let messageData = {
        recipient: {
            id: senderID
        },
        message: {
            text: messageText
        }
    };
    callsendAPI(messageData);
};

function callsendAPI(messageData) {
    request({
        uri: global.config.facebook.URI_POST_DEFAULT + 'messages',
        qs: { access_token: global.config.facebook.TOKEN_ACCESS_PAGE },
        method: 'POST',
        json: messageData
    }, function(error, response, body) {
        if (error) {
            console.log("Erro ao tentar enviar mensagem %d", error);
            return;
        }

        if (response.statusCode == 200) {
            let recipientID = body.recipient_id;
            // let mensageID = body.message_id;
            // console.log("Mensagem enviada com sucesso do %d e mensagem %d", recipientID, messageID);
        }
    });
};


module.exports = WebHookController;