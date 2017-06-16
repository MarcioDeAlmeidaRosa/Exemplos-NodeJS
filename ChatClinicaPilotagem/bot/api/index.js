let express = require('express');
let router = express.Router();
let path = require('path');

let botsModel = require(path.resolve('./db/models/bot'));

const BotsController = require(path.resolve('./bot/api/controllers/BotsController'));
let botsController = new BotsController(botsModel);

router.post('/', botsController.add);
router.route('/fbwebhook').get(botsController.getWebHook);
router.route('/fbwebhook').post(botsController.receiverMessage);
router.route('/fbmessagemmain').post(botsController.setMessageMain);

module.exports = router;