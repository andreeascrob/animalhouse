const User = require("../models/User");
const express = require("express");
const router = express.Router();
var { expressjwt: jwt } = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const secret = 'secret';

router.get('/info/:id', async (req, res) => {
	const user = await User.findOne({'_id': req.params.id}).select('name surname').exec();
	if (user) {
		res.status(200).send(user);
	} else {
		res.status(404).send();
	}
});

router.get('/profile', jwt({secret: secret, algorithms: ["HS256"], credentialsRequired: true},), async (req, res) => {
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
			const token = jsonwebtoken.sign(user._id.toString(), secret);
			res.status(201).send(JSON.stringify({token: token}));
		} else {
			res.status(404).send();
		}
	}
});

router.post('/signup', async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		const token = jsonwebtoken.sign(newUser._id.toString(), secret);
		res.status(201).send(JSON.stringify({token: token}));
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
