const express = require('express');
const bodyParser = require('body-parser');
const SQSConsumer = require('./sns/Consumer');
const app = express();
app.use(bodyParser.json());

const consumer = new SQSConsumer();

app.use('/', require('./routers'));

app.listen(3000, () => {
	console.clear();
	console.log('Server listening on port 3000');

	consumer.subscribe();
});
