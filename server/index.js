const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const expressjwt = require('express-jwt');
const { engine } = require('express-handlebars');

const port = 8000;
global.jwtSecret = 'secret';

mongoose.connect('mongodb://0.0.0.0:27017/test').then(() => {
	const app = express();
	app.use(cors());
	app.use(express.json());

	app.engine('handlebars', engine());
	app.set('view engine', 'handlebars');
	app.set('views', './views');

	app.get('/front/', (req, res) => {
		res.render('front/home', {layout: 'front/main'});
	});
	app.get('/front/addpet', (req, res) => {
		res.render('front/addpet', {layout: 'front/main'});
	});
	app.get('/front/book', (req, res) => {
		res.render('front/book', {layout: 'front/main'});
	});
	app.get('/front/branches', (req, res) => {
		res.render('front/branches', {layout: 'front/main'});
	});
	app.get('/front/cart', (req, res) => {
		res.render('front/cart', {layout: 'front/main'});
	});
	app.get('/front/changepassword', (req, res) => {
		res.render('front/changepassword', {layout: 'front/main'});
	});
	app.get('/front/newpost', (req, res) => {
		res.render('front/newpost', {layout: 'front/main'});
	});
	app.get('/front/pet/:id', (req, res) => {
		res.render('front/pet', {layout: 'front/main'});
	});
	app.get('/front/profile', (req, res) => {
		res.render('front/profile', {layout: 'front/main'});
	});
	app.get('/front/search', (req, res) => {
		res.render('front/search', {layout: 'front/main'});
	});
	app.get('/front/services', (req, res) => {
		res.render('front/services', {layout: 'front/main'});
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
	app.get('/back/changepassword', (req, res) => {
		res.render('back/changepassword', {layout: 'back/main'});
	});
	app.get('/back/profile', (req, res) => {
		res.render('back/profile', {layout: 'back/main'});
	});
	app.get('/back/signup', (req, res) => {
		res.render('back/signup', {layout: 'back/main'});
	});
	app.get('/back/signin', (req, res) => {
		res.render('back/signin', {layout: 'back/main'});
	});

	app.use(express.static('static'));

	app.use('/api/populate', require('./api/routes/populate.js'));
	app.use('/api/animals', require('./api/routes/animals.js'));
	app.use('/api/branches', require('./api/routes/branches.js'));
	app.use('/api/categories', require('./api/routes/categories.js'));
	app.use('/api/order', require('./api/routes/order.js'));
	app.use('/api/pets', require('./api/routes/pets.js'));
	app.use('/api/products', require('./api/routes/products.js'));
	app.use('/api/services', require('./api/routes/services.js'));
	app.use('/api/topics', require('./api/routes/topics.js'));
	app.use('/api/users', require('./api/routes/users.js'));

	app.get('/', (req, res) => {
		res.send('<a href="/game">Game</a> | <a href="/front">Front-office</a> | <a href="/back">Back-office</a>');
	});

	app.listen(port, () => {
		console.log(`http://localhost:${port}/`);
	});
});
