const router = require('express').Router();
const { message_queue } = require('../controllers');
const { SNS_KEYS } = require('../utils/constants');
router.get('/sendMessage', async (req, res) => {
	try {
		const message = {
			time_stamp: Date.now(),
			user_id: 10001,
			event: SNS_KEYS.USER_ADDED,
			properties: {
				name: 'Hamza Zahid',
				company: 'Homitag',
			},
		};
		const data = await message_queue.sendMessage(message);
		res.status(data.status).json({ message: data.message });
	} catch (err) {
		console.error(`Error sending message: ${err}`);
		res.status(500).send({ error: 'Error sending message' });
	}
});

router.get('/unsubscribe', async (req, res) => {
	try {
		const data = await message_queue.unsubscribe(message);
		res.status(data.status).json({ message: data.message });
	} catch (err) {
		console.error(`Error Unsubscribing Queue: ${err}`);
		res.status(500).send({ error: 'Error Unsubscribing Queue' });
	}
});

router.get('/subscribe', async (req, res) => {
	try {
		const data = await message_queue.subscribe(message);
		res.status(data.status).json({ message: data.message });
	} catch (err) {
		console.error(`Error subscribing Queue: ${err}`);
		res.status(500).send({ error: 'Error subscribing Queue' });
	}
});

module.exports = router;
