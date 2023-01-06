const router = require('express').Router();
const message_queue = require('./message_queue');
router.use('/', message_queue);
module.exports = router;
