console.log("Execuntando routes/controllers/WebHookController.js - carregando a classe....");

class WebHookController {
    getHook(req, res) {
        res.send("Serviço funcionando");
    }

    add(req, res) {
        res.send("OK");
    }
}

module.exports = WebHookController;