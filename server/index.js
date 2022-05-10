const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const port = 8000;

mongoose.connect('mongodb://localhost:27017/test').then(() => {
	const app = express();
	app.use(cors());
	app.use(express.json());

	app.use(express.static('static'));

	app.use('/api/animals', require('./api/routes/animals.js'));
	app.use('/api/categories', require('./api/routes/categories.js'));
	app.use('/api/products', require('./api/routes/products.js'));

	app.get('/', (req, res) => {
		res.send('<a href="/game">Game</a> | <a href="/front">Front-office</a> | <a href="/back">Back-office</a>');
	});

	app.listen(port, () => {
		console.log(`http://localhost:${port}/`);
	});
});
