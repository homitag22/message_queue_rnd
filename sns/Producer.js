const AWS = require('aws-sdk');
const { SNS_CONFIG } = require('../utils/constants');

class SNSProducer {
	constructor() {
		this.sns = new AWS.SNS({ region: SNS_CONFIG.REGION });
		this.topicArn = SNS_CONFIG.ARN_SIMPLE;
		this.topicArnSensative = SNS_CONFIG.ARN_SENSATIVE;
	}

	publish(message, cb) {
		this.sns.publish(
			{
				Message: message,
				TopicArn: this.topicArn,
			},
			cb,
		);
	}

	publishSensative(message, cb) {
		this.sns.publish(
			{
				Message: message,
				TopicArn: this.topicArnSensative,
			},
			cb,
		);
	}
}

module.exports = SNSProducer;

/* 
===============================================================================================================================================
                                                            USAGE
===============================================================================================================================================

	const SNSProducer = require('./sns-producer');

	const producer = new SNSProducer({
		region: 'us-west-1',
		topicArn: 'arn:aws:sns:us-west-1:973463860934:EVENT_SIMPLE'
	});

	producer.publish('Hello, world!', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}

		console.log(data);
	});

*/
