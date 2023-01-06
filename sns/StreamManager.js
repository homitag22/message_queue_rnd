const { SNS_KEYS } = require('../utils/constants');

const event_functions = Object.freeze({
	[SNS_KEYS.USER_ADDED]: async (data) => {
		console.log('User created', data);
	},
});

exports.streamProcessor = async (data) => {
	console.log('STREAM PROCESSER EVENT => ', data.event);
	if (event_functions[data.event]) {
		console.log('GOT DATA');
		await event_functions[data.event](data);
	}
};
