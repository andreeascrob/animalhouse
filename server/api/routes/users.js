const User = require('../models/User');
const express = require('express');
const router = express.Router();
var { expressjwt: jwt } = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

router.get('/info/:id', async (req, res) => {
	const user = await User.findOne({'_id': req?.params?.id}).select('name surname').exec();
	if (user) {
		res.status(200).send(user);
	} else {
		res.status(404).send();
	}
});

router.post('/changepassword', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), async (req, res) => {
	try {
		const user = await User.findOne({'_id': req.auth}).exec();
		if (user.password == req?.body?.oldpassword) {
			await User.updateOne(
				{'_id': req.auth},
				{$set: {
					'password': req.body.newpassword
				}}
			);
			res.status(200).send();
		} else {
			res.status(403).send('Incorrect old password');
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/profile', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), async (req, res) => {
	const user = await User.findOne({'_id': req.auth}).exec();
	if (user == null) {
		res.status(404).send();
	} else {
		res.status(200).send(user);
	}
});

router.post('/profile', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), async (req, res) => {
	try {
		await User.updateOne(
			{'_id': req.auth},
			{$set: {
				'name': req.body.name,
				'surname': req.body.surname,
				'email': req.body.email,
				'address': req.body.address,
				'city': req.body.city
			}}
		);
		res.status(200).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/profile', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), async (req, res) => {
	const user = await User.findOne({'_id': req.auth}).exec();
	if (user == null) {
		res.status(404).send();
	} else {
		res.status(200).send(user);
	}
});

router.post('/signin', async (req, res) => {
	const user = await User.findOne({'email': req.body.email}).exec();
	if (user == null) {
		res.status(404).send();
	} else {
		if (user.password == req.body.password) {
			const token = jsonwebtoken.sign(user._id.toString(), jwtSecret);
			res.status(201).send(JSON.stringify({'id': user._id, 'token': token}));
		} else {
			res.status(404).send();
		}
	}
});

router.post('/signup', async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		const token = jsonwebtoken.sign(newUser._id.toString(), jwtSecret);
		res.status(201).send(JSON.stringify({'id': newUser._id, 'token': token}));
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.post('/signup/admin', async (req, res) => {
	try { 
		req.body.isadmin = true;
		const newUser = new User(req.body);
		await newUser.save();
		const token = jsonwebtoken.sign(newUser._id.toString(), jwtSecret);
		res.status(201).send(JSON.stringify({'id': newUser._id, 'token': token}));
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
