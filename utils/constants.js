exports.SNS_CONFIG = Object.freeze({
	REGION: 'us-west-2',
	ARN_SIMPLE: 'arn:aws:sns:us-west-2:973463860934:ACCOUNT_EVENT',
	ARN_SENSATIVE: 'arn:aws:sns:us-west-2:973463860934:EVENT_SENSATIVE',
	CATALOG_QUEUE:
		'https://sqs.us-west-2.amazonaws.com/973463860934/CATALOG_EVENT',
});

exports.SNS_KEYS = Object.freeze({
	USER_ADDED: 'USER_ADDED',
	USER_DELETED: 'USER_DELETED',
});
