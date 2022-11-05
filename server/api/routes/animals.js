const express = require("express");
const Animal = require("../models/Animal");
const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const newAnimal = new Animal(req.body);
		await newAnimal.save();
		res.status(201).send(newProduct);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/', async (req, res) => {
	const animals = await Animal.find();
	res.send(animals);
});

router.get('/:animalId', async (req, res) => {
	try {
		const animal = await Animal.findOne({'_id': req.params.animalId}).exec();
		if (animal == null) {
			res.status(404).send();
		} else {
			res.send(animal);
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
