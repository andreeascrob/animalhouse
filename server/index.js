const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const expressjwt = require('express-jwt');
const { engine } = require('express-handlebars');

const port = 8000;

mongoose.connect('mongodb://localhost:27017/test').then(() => {
	const app = express();
	app.use(cors());
	app.use(express.json());

	app.engine('handlebars', engine());
	app.set('view engine', 'handlebars');
	app.set('views', './views');
	app.get('/front/', (req, res) => {
		res.render('home');
	});
	app.get('/front/signin', (req, res) => {
		res.render('signin');
	});
	app.get('/front/signup', (req, res) => {
		res.render('signup');
	});
	app.get('/front/product/:slug', (req, res) => {
		res.render('product', {slug: req.params.slug});
	});
	app.use(express.static('static'));

	app.use('/api/populate', require('./api/routes/populate.js'));
	app.use('/api/animals', require('./api/routes/animals.js'));
	app.use('/api/categories', require('./api/routes/categories.js'));
	app.use('/api/products', require('./api/routes/products.js'));
	app.use('/api/users', require('./api/routes/users.js'));

	app.get('/', (req, res) => {
		res.send('<a href="/game">Game</a> | <a href="/front">Front-office</a> | <a href="/back">Back-office</a>');
	});

	app.listen(port, () => {
		console.log(`http://localhost:${port}/`);
	});
});
