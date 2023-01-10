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

async function getUser(req, res, isadmin) {
	let query = User.findOne({'_id': req.auth});
	if(isadmin)
		query = query.where('isadmin').equals(true);
	const user = await query.exec();
	if (user == null) {
		res.status(404).send(isadmin ? {success: false, description: 'Non sei un admin'} : undefined);
	} else {
		res.status(200).send(isadmin ? {success: true, user} : user);
	}
};

router.get('/profile', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), async (req, res) => {
	await getUser(req, res, false)
});

router.get('/profile/admin', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), async (req, res) => {
	await getUser(req, res, true)
});

async function postChangep(req, res, isadmin){
	try {
		let query = await User.findOne({'_id': req.auth});
		if(isadmin)
			query = query.where('isadmin').equals(true);
		const user = await query.exec();
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
};

router.post('/changepassword', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), async (req, res) => {
	await postChangep(res, req, false)
});

router.post('/changepassword/admin', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), async (req, res) => {
	await postChangep(req, res, true)
});


async function postProfile(req, res, isamin){
	try {
		let query = await User.updateOne(
			{'_id': req.auth},
			{$set: {
				'name': req.body.name,
				'surname': req.body.surname,
				'email': req.body.email,
				'address': req.body.address,
				'city': req.body.city
			}}
		);
		if(isadmin)
			query = query.where('isadmin').equals(true);
		res.status(200).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
}

router.post('/profile', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), async (req, res) => {
	await getUser(req, res, false)
});


router.post('/profile/admin', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), async (req, res) => {
	await postProfile(req, res, false) 
});

const signin = async (req, res) => {
	const user = await User.findOne({'email': req.body.email}).exec();
	if (user == null) {
		console.log("user not found");
		res.status(404).send();
	} else {
		if (user.password == req.body.password) {
			const token = jsonwebtoken.sign(user._id.toString(), jwtSecret);
			res.status(201).send(JSON.stringify({'id': user._id, 'token': token}));
		} else {
			console.log("pasword not found");
			res.status(404).send();
		}
	}
}
async function singup(req, res, isadmin){
	try {
		if(isadmin)
			req.body.isadmin = true;
		const newUser = new User(req.body);
		await newUser.save();
		const token = jsonwebtoken.sign(newUser._id.toString(), jwtSecret);
		res.status(201).send(JSON.stringify({'id': newUser._id, 'token': token}));
	} catch (err) {
		res.status(400).send(err.message);
	}
}

router.post('/signin', signin);

router.post('/signin/admin', signin);

router.post('/signup', async (req, res) => {
	await singup(req, res, false)
});

router.post('/signup/admin', async (req, res) => {
	await singup(req, res, true)
});

module.exports = router;
