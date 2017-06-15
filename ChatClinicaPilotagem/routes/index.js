let express = require('express');
let router = express.Router();
let path = require('path');

const WebHookController = require(path.resolve('./routes/controllers/WebHookController'));
let webHookController = new WebHookController();

router.get('/fbwebhook', webHookController.getHook);

router.post('/fbwebhook', webHookController.message.bind(webHookController));

module.exports = router;