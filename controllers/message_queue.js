const SQSConsumer = require('../sns/Consumer');
const SNSProducer = require('../sns/Producer');

module.exports = {
	sendMessage: async (body) => {
		try {
			const data = JSON.stringify(body);

			const sns = new SNSProducer();
			sns.publish(data, (err, data) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log(data);
			});
			return { status: 200, message: 'Message sent successfully' };
		} catch (err) {
			console.error(`Error sending message: ${err}`);
			return { status: 500, message: 'Error sending message' };
		}
	},
	subscribe: async () => {
		try {
			consumer.subscribe();
			return { status: 200, message: 'Consumer subscribed successfully' };
		} catch (err) {
			console.error(`Error subscribing consumer message: ${err}`);
			return { status: 500, message: 'Error subscribing consumer' };
		}
	},
	unsubscribe: async () => {
		try {
			consumer.unsubscribe();
			return { status: 200, message: 'Consumer unsubscribed successfully' };
		} catch (err) {
			console.error(`Error Unsubscribing consumer message: ${err}`);
			return { status: 500, message: 'Error Unsubscribing consumer' };
		}
	},
};
