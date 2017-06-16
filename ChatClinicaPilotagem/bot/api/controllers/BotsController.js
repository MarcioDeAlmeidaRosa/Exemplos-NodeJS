let halk = require('chalk');
let request = require('request');

let Bot = {};

class BotsController {

    constructor(bot) {
        Bot = bot;
    }

    add(req, res) {
        // TODO - ONDE ESTA O VINCULO DESTE OBJETO COM O SCHEMA E COM A CONEXÃO?
        let bot = new Bot(req.body);
        bot.save();
        res.send('Bot cadastrado com sucesso');
        // bot.save(function(err) {
        //     console.log(halk.green("Executando cb do save."));
        //     if (err) {
        //         console.log(halk.red("Erro ao cadastrar bot: " + err));
        //         // global.logger(err);
        //         res.status(500).send('Erro ao cadastrar Bot');
        //     } else {
        //         console.log(halk.green("Bot cadastrado com sucesso."));
        //         //global.events.emit('loadBot', bot);
        //         res.send('Bot cadastrado com sucesso')
        //     }
        // });
    }

    fbWebHook(req, res) {
        //Metodo responsável por efetuar o hook com facebook
        if (req.params.id) {
            global.bots.forEach(bot => {
                console.log(halk.green("Percorrendo " + bot.Name));
                if (bot.mongoId != req.params.id) {
                    return;
                }

                if ((req.query["hub.mode"] === "subscribe") &&
                    (req.query["hub.verify_token"] === bot.verifyToken)
                ) {
                    console.log(halk.green("Validação webhook ok"));
                    res.status(200).send(req.query["hub.challenge"]);
                } else {
                    console.log(halk.red("Validação webhook falhou"));
                    res.sendStatus(403);
                }

            });
        } else {
            console.log('erro id nulo')
            res.status(403).end('nenhum código informado');
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
        //TODO - IMPLEMENTAR ID PARA ENCONTRAR O BOT
        let data = req.body;
        console.log(data);
        request({
            uri: global.config.env.fb.URI_POST_DEFAULT + 'thread_settings',
            qs: { access_token: global.config.env.fb.TOKEN_ACCESS_PAGE },
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
        uri: global.config.env.fb.URI_POST_DEFAULT + 'messages',
        qs: { access_token: global.config.env.fb.TOKEN_ACCESS_PAGE },
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


module.exports = BotsController;