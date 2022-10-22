const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const expressjwt = require('express-jwt');
const { engine } = require('express-handlebars');

const port = 8000;
global.jwtSecret = 'secret';

mongoose.connect('mongodb://localhost:27017/test').then(() => {
	const app = express();
	app.use(cors());
	app.use(express.json());

	app.engine('handlebars', engine());
	app.set('view engine', 'handlebars');
	app.set('views', './views');

	app.get('/front/', (req, res) => {
		res.render('front/home', {layout: 'front/main'});
	});
	app.get('/front/cart', (req, res) => {
		res.render('front/cart', {layout: 'front/main'});
	});
	app.get('/front/newpost', (req, res) => {
		res.render('front/newpost', {layout: 'front/main'});
	});
	app.get('/front/signin', (req, res) => {
		res.render('front/signin', {layout: 'front/main'});
	});
	app.get('/front/signup', (req, res) => {
		res.render('front/signup', {layout: 'front/main'});
	});
	app.get('/front/animal/:slug', (req, res) => {
		res.render('front/animal', {layout: 'front/main'});
	});
	app.get('/front/board/:slug', (req, res) => {
		res.render('front/board', {layout: 'front/main'});
	});
	app.get('/front/product/:slug', (req, res) => {
		res.render('front/product', {layout: 'front/main'});
	});
	app.get('/front/topic/:id', (req, res) => {
		res.render('front/topic', {layout: 'front/main'});
	});

	app.get('/back/', (req, res) => {
		res.render('back/home', {layout: 'back/main'});
	});
	app.get('/back/boards', (req, res) => {
		res.render('back/boards', {layout: 'back/main'});
	});
	app.use(express.static('static'));

	app.use('/api/populate', require('./api/routes/populate.js'));
	app.use('/api/animals', require('./api/routes/animals.js'));
	app.use('/api/categories', require('./api/routes/categories.js'));
	app.use('/api/order', require('./api/routes/order.js'));
	app.use('/api/products', require('./api/routes/products.js'));
	app.use('/api/topics', require('./api/routes/topics.js'));
	app.use('/api/users', require('./api/routes/users.js'));

	app.get('/', (req, res) => {
		res.send('<a href="/game">Game</a> | <a href="/front">Front-office</a> | <a href="/back">Back-office</a>');
	});

	app.listen(port, () => {
		console.log(`http://localhost:${port}/`);
	});
});
