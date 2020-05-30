const express = require('express');
const app = express();

function allowCORS(req, res, next) {
	if (req.method === 'OPTIONS') {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Credentials', true);
		res.set('Access-Control-Allow-Methods', '*');
		res.set('Access-Control-Allow-Headers', '*');
		res.status(200).end();
		return;
	}

	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Access-Control-Allow-Methods', '*');
	res.set('Access-Control-Allow-Headers', '*');

	next();
}

app.use('*', allowCORS);

app.get('/', function(_req, res) {
	setTimeout(() => {
		res.send('Hello world after 10 seconds');
	}, 10000);
});

app.listen(3000);
