let express = require('express');
let router = express.Router();
let path = require('path');

let botsModel = require(path.resolve('./db/models/bot'));

const BotsController = require(path.resolve('./bot/api/controllers/BotsController'));
let botsController = new BotsController(botsModel);

router.post('/', botsController.add);
router.route('/fbwebhook/:id').get(botsController.fbWebHook).post(botsController.receiverMessage);
router.route('/fbmessagemmain/:id').post(botsController.setMessageMain);

module.exports = router;