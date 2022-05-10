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

module.exports = router;
