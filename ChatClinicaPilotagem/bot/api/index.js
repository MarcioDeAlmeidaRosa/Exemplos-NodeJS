let express = require('express');
let router = express.Router();
let path = require('path');

const WebHookController = require(path.resolve('./bot/api/controllers/WebHookController'));
let webHookController = new WebHookController();

router.post('/', webHookController.add);
router.route('/fbwebhook').get(webHookController.getWebHook);
router.route('/fbwebhook').post(webHookController.receiverMessage);
router.route('/fbmessagemmain').post(webHookController.setMessageMain);

module.exports = router;