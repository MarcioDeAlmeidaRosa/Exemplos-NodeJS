let Botly = require('botly');
let async = require('async');

class Facebook {

    //cria o botly e adidiona os eventos message e postback para o EventEmitter
    createBot(botModel, cb) {
        console.log("Executando Facebook.createBot");
        if (!botModel) {
            return cb({
                error: 'Nenhum model informado'
            });
        }

        if (!botModel._id) {
            return cb({
                error: 'Nenhum id informado'
            });
        }

        if (!botModel.token) {
            return cb({
                error: 'Nenhum token informado'
            });
        }

        if (!botModel.verify) {
            return cb({
                error: 'Nenhum verify informado'
            });
        }

        if (!botModel.pageId) {
            return cb({
                error: 'Nenhum pageId informado'
            });
        }

        let botly = new Botly({
            accessToken: botModel.token, //page access token provided by facebook
            verifyToken: botModel.verify, //needed when using express - the verification token you provided when defining the webhook in facebook
            notificationType: Botly.CONST.REGULAR //already the default (optional), 
        });

        //dados do mongodb
        botly.mongoId = botModel._id;
        botly.Name = botModel.source;
        botly.active = true;
        botly.source = botModel.source;
        botly.startStatus = botModel.startStatus;
        botly.sessionLimit = botModel.sessionLimit;

        botly.on("message", (sender, message) => {
            //global.events.emit('logMessage', message);
            botly.getUserProfile(sender, function(err, info) {
                if (err) {
                    console.log('Erro ' + err);
                    //global.logger(err);
                }
                info.chatId = sender;
                console.log('send message to transform');
                global.events.emit('transformMessage', { bot: botly, userData: info, msg: message });
            });
        });

        botly.on("postback", (sender, message) => {
            botly.getUserProfile(sender, function(err, info) {
                botly.getUserProfile(sender, function(err, info) {
                    if (err) {
                        //global.logger(err);
                        console.log('Erro ' + err);
                    }
                    info.chatId = sender;
                    console.log('send postback to transform');
                    global.events.emit('transformMessage', { bot: botly, userData: info, msg: message });
                });
            });
        });


        cb(null, botly);
    }

    sendResponse() {

    }
}

module.exports = new Facebook();