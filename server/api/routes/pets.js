const Animal = require('../models/Animal');
const Pet = require('../models/Pet');
const express = require('express');
const router = express.Router();
var { expressjwt: jwt } = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const multer  = require('multer');
const upload = multer({ dest: path.join(__dirname, '../../static/uploads/') });
const fs = require('fs');

router.post('/', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true}), upload.single('image'), async (req, res) => {
	try {
		let petData = {};
		petData['name'] = req.body.name;
		petData['ownerId'] = req.auth;
		const animalId = await Animal.findOne({'slug': req.body.animalSlug}).select('_id').exec();
		petData['animalId'] = animalId._id.toString();
		petData['species'] = req.body.species;
		petData['birth'] = req.body.birth;
		petData['informations'] = req.body.informations;
		if (req.file) {
			petData['imageUrl'] = '/uploads/' + req.file.filename;
		}
		const newPet = new Pet(petData);
		await newPet.save();
		res.status(201).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), async (req, res) => {
	try {
		const pets = await Pet.find({'ownerId': req.auth}).select('-informations').exec();
		res.status(200).send(pets);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.post('/:id', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true},), upload.single('image'),  async (req, res) => {
	try {
		const pet = await Pet.findOne({'_id': req.params.id}).exec();
		if (pet.ownerId == req.auth) {
			const animalId = await Animal.findOne({'slug': req.body.animalSlug}).select('_id').exec();
			await Pet.updateOne(
				{'_id': req.params.id},
				{$set: {
					'name': req.body.name,
					'animalId': animalId._id.toString(),
					'species': req.body.species,
					'birth': req.body.birth,
					'informations': req.body.informations
				}}
			);
			if (req.file) {
				if (pet.imageUrl) {
					fs.unlinkSync(path.join(__dirname, '../../static', pet.imageUrl));
				}
				await Pet.updateOne(
					{'_id': req.params.id},
					{$set: {
						'imageUrl': '/uploads/' + req.file.filename
					}}
				);
			}
			res.status(200).send();
		} else {
			res.status(403).send('Only the owner can update a pet');
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/:id', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true}), async (req, res) => {
	try {
		const pet = await Pet.findOne({'_id': req.params.id}).exec();
		if (pet.ownerId == req.auth) {
			res.status(200).send(pet);
		} else {
			res.status(403).send('Only the owner can get a pet');
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.delete('/:id', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true}), async (req, res) => {
	try {
		const pet = await Pet.findOne({'_id': req.params.id}).exec();
		if (req.auth == pet.ownerId) {
			await Pet.findByIdAndDelete(req.params.id).exec();
			if (pet.imageUrl) {
				fs.unlinkSync(path.join(__dirname, '../../static', pet.imageUrl));
			}
			res.status(200).send();
		} else {
			res.status(403).send('Only the owner can delete a pet');
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
