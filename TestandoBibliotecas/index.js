console.log("Diretório de execução ------> " + process.cwd());
console.log("--------------------------------------------------------------------------------");
// concatenar conteúdo
path = require('path'); // <--NATIVO NODE
console.log(path.join(process.cwd(), 'config/env/default'));

//operador ternário
var teste = "" || "segunda palavra";
console.log(teste);

var teste2 = "primeira palavra" || "segunda palavra";
console.log(teste2);

var teste3 = "primeira palavra" || "segunda palavra" || "terceira palavra";
console.log(teste3);

var teste4 = "" || "segunda palavra" || "terceira palavra";
console.log(teste4);

var teste5 = "" || "" || "terceira palavra";
console.log(teste5);

console.log("--------------------------------------------------------------------------------");

console.log(path.resolve("teste-pasta1"));

console.log("--------------------------------------------------------------------------------");
console.log("---------ENTENDER MELHOR-----");
_ = require('lodash');
// npm i -g npm
// npm i --save lodash
var funcao1 = {
    app: {
        title: 'ZTBotPlatform',
        description: 'plataforma de bots',
        keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'
    },
    port: process.env.PORT || 4040,
    host: process.env.HOST || '0.0.0.0'
};

var funcao2 = {
    nome: "José da Silva"
};

var funcao3 = function() {
    console.log("chamou funcao3...");
};

_.merge(funcao1, funcao2, funcao3);

// console.log(_().app);
// console.log(_.CurriedFunction2);
// console.log(_.funcao3());
// console.log(_.toString());
console.log("--------------------------------------------------------------------------------");