const Branch = require('../models/Branch');
const Pet = require('../models/Pet');
const Service = require('../models/Service');
const express = require('express');
const router = express.Router();
var { expressjwt: jwt } = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

router.post('/', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true}), async (req, res) => {
	try {
		const pet = await Pet.findOne({'_id': req.body.petId}).exec();
		if (pet.ownerId == req.auth) {
			const branch = await Branch.findOne({'servicesSlots._id': req.body.serviceSlotId}).exec();
			const slots = branch.servicesSlots.filter((element) => {
				return element._id == req.body.serviceSlotId && !element.petId;
			});
			if (slots[0]) {
				await Branch.updateOne({'servicesSlots._id': req.body.serviceSlotId}, {'$set': {
					'servicesSlots.$.petId': pet._id
				}}).exec();
				res.status(200).send();
			} else {
				res.status(409).send();
			}
		} else {
			res.status(403).send('Only the owner can book a service for a pet');
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true}), async (req, res) => {
	try {
		const pets = await Pet.find({'ownerId': req.auth}).exec();
		let bookings = {};
		for(var i = 0; i < pets.length; ++i){
			const branches = await Branch.find({'servicesSlots.petId': pets[i]._id}).lean().exec();
			for(var j = 0; j < branches.length; ++j){
				let slots = branches[j].servicesSlots.filter((element) => {
					return element.petId && element.petId.equals(pets[i]._id);
				});
				for(var k = 0; k < slots.length; ++k){
					const service = await Service.findOne({'_id': slots[k]['serviceId']}).exec();
					slots[k] = {
						'_id': slots[k]._id,
						'serviceName': service.name,
						'info': slots[k].info,
						'start': slots[k].start,
						'end': slots[k].end,
						'address': branches[j].address,
						'city': branches[j].city,
					}
				}
				if (!bookings[pets[i].name]) {
					bookings[pets[i].name] = [];
				}
				bookings[pets[i].name].push(...slots);
			}
		}
		res.status(200).send(bookings);
	} catch (err) {
		res.status(400).send(err.message);
	}
});
router.get('/:branchId/:serviceId',/*jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true}),*/ async (req, res) => {
	try {
		const branch = await Branch.findOne({'_id': req.params.branchId}).exec();
		const services = branch.servicesSlots.filter(s => s.serviceId == req.params.serviceId)
		res.status(200).send(services);
	} catch (err) {
		res.status(400).send(err.message);
	}
});
router.patch('/:serviceSlotId', async (req, res) => {
	try {
		const booking = await Branch.updateOne({'servicesSlots._id': req.params.serviceSlotId}, {$set: {
			'servicesSlots.$.info': req.body.info,
		}}).exec();
		console.log(booking)
		res.status(202).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});


router.delete('/:serviceSlotId', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: true}), async (req, res) => {
	try {
		const branch = await Branch.findOne({'servicesSlots._id': req.params.serviceSlotId}).exec();
		const slot = branch.servicesSlots.filter((element) => {
			return element._id == req.params.serviceSlotId;
		})[0];
		const pet = await Pet.findOne({'_id': slot.petId}).exec();

		if (pet.ownerId == req.auth) {
			await Branch.updateOne({'servicesSlots._id': req.params.serviceSlotId}, {'$unset': {'servicesSlots.$.petId': ''}}).exec();
			res.status(200).send();
		} else {
			res.status(403).send('Only the owner can cancel a service for a pet');
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
