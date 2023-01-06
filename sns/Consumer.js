const AWS = require('aws-sdk');

const { SNS_CONFIG } = require('../utils/constants');
const { streamProcessor } = require('./StreamManager');

class SQSConsumer {
	constructor() {
		this.sqs = new AWS.SQS({ region: SNS_CONFIG.REGION });
		this.queueUrl = SNS_CONFIG.CATALOG_QUEUE;
		this.consumerId = null;
	}

	receiveMessage = async () => {
		const params = {
			QueueUrl: this.queueUrl,
			MaxNumberOfMessages: 10,
		};
		try {
			const data = await this.sqs.receiveMessage(params).promise();
			if (data.Messages) {
				return data.Messages.map((m) => m.Body);
			} else {
				return [];
			}
		} catch (err) {
			console.error(`Error receiving message: ${err}`);
			throw err;
		}
	};

	async deleteMessage(receiptHandle) {
		const params = {
			QueueUrl: this.queueUrl,
			ReceiptHandle: receiptHandle,
		};

		try {
			await this.sqs.deleteMessage(params).promise();
			console.log(`Deleted message with receipt handle: ${receiptHandle}`);
		} catch (err) {
			console.error(`Error deleting message: ${err}`);
			throw err;
		}
	}

	consumeMessages = async () => {
		try {
			let messages = await this.receiveMessage();
			for (const message of messages) {
				streamProcessor(JSON.parse(message));
				// streamProcessor
				console.log(`Received message: ${message}`);
			}
		} catch (err) {
			console.error(`Error consuming messages: ${err}`);
		}
	};

	subscribe() {
		this.consumerId = setInterval(this.consumeMessages, 1000);
		console.log('Consumer Subscribed Successfully');
	}

	unsubscribe() {
		if (this.consumerId) {
			clearInterval(this.consumerId);
			console.log('Consumer Unsubscribed Successfully');
		}
	}
}

module.exports = SQSConsumer;
