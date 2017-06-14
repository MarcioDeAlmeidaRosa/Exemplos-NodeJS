class WebHookController {

    get(req, res) {
        res.send("Isto é um WebHook");
    }
    add(req, res) {
        res.send("OK");
    }



}

module.exports = WebHookController;