let halk = require('chalk');
let path = require('path');
let Bot = require(path.resolve('./db/models/bot'));

class BotLoader {

    //cria os eventos loadBot e sendResponse para o EventEmitter
    constructor() {
        console.log(halk.bgGreen("Construtor da BotLoader"));

        global.events.on('loadBot', bot => {
            this.loadOne(bot);
        });

        global.events.on('sendResponse', data => {
            let bottype = require(path.resolve('./bot/channels/' + data.bot.source));
            bottype.sendResponse(data);
        });
    }

    //Carrega todos os bots cadastrados para a memória
    loadAll() {
        console.log(halk.bgGreen("Carregando todos os bots"));
        //recupera todos os bots cadastrados no bd e carrega para variável global
        Bot.find({ active: true }, (err, bots) => {
            if (bots) {
                bots.forEach(bot => { loadBot(bot); });
            }
        });
    }

    //Carrega o bot cadastrado com o serviço já rodando
    loadOne(bot) {
        console.log(halk.bgGreen("Carregando s bot"));
        //incluindo bot na lista quando o serviço estiver rodando
        if (bot) {
            loadBot(bot);
        }
    }
}

//Cria o canal do bot carregado e adiciona na memória
function loadBot(bot) {
    console.log(halk.bgGreen("Carregando o bot => " + bot.source));
    let botType = require(path.resolve('./bot/channels/' + bot.source));
    botType.createBot(bot, (err, bot) => {
        if (err) {
            console.log(halk.bgRed("Erro ao carregar bot => " + err));
        } else {
            console.log(halk.bgGreen("Bot => " + bot.source + " carregado com sucesso ( " + bot.Name + " )"));
            global.bots.push(bot);
        }
    });
};

module.exports = new BotLoader();