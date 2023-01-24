const Animal = require('../models/Animal');
const Branch = require('../models/Branch');
const Pet = require('../models/Pet');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const newBranch = new Branch(req.body);
		await newBranch.save();
		res.status(201).send(newBranch);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/', async (req, res) => {
	try {
		let query = {};
		if (req.query.serviceId) {
			const branches = await Branch.find({'servicesSlots.serviceId': req.query.serviceId}).exec();
			res.status(200).send(branches);
		} else {
			const branches = await Branch.find().exec();
			res.status(200).send(branches);
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const branch = await Branch.findOne({'_id': req.params.id}).exec();
		res.status(200).send(branch);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Branch.findByIdAndDelete(req.params.id).exec();
		return res.status(200).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.post('/:id/servicesSlots', async (req, res) => {
	try {
		await Branch.updateOne(
			{'_id': req.params.id},
			{$push: {'servicesSlots': req.body}}
		).exec();
		
		res.status(201).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/:id/servicesSlots', async (req, res) => {
	try {
		if (req.query.serviceId && req.query.petId) {
			const pet = await Pet.findOne({'_id': req.query.petId}).exec();
			const branch = await Branch.findOne({'_id': req.params.id}).exec();
			let slots = branch.servicesSlots.filter((element) => {
				return element.serviceId == req.query.serviceId && element.animalId.equals(pet.animalId) && element.start >= new Date() && !element.petId;
			});
			res.status(200).send(slots);
		} else {
			res.status(400).send('serviceId and petId params are required.');
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.delete('/:id/servicesSlots/:serviceSlotId', async (req, res) => {
	try {
		const branch = await Branch.findOne({'_id': req.params.id}).exec();
		await branch.servicesSlots.pull({'_id': req.params.serviceSlotId});
		res.status(200).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
