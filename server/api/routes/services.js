const express = require('express');
const Service = require('../models/Service');
const router = express.Router();
const path = require('path');
const multer  = require('multer');
const upload = multer({ dest: path.join(__dirname, '../../static/uploads/') });
const fs = require('fs');

router.post('/', upload.single('image'), async (req, res) => {
	try {
		if (req.file) {
			req.body['imageUrl'] = '/uploads/' + req.file.filename;
		}
		const newService = new Service(req.body);
		await newService.save();
		res.status(201).send(newService);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/', async (req, res) => {
	const services = await Service.find().exec();
	res.send(services);
});

router.get('/:serviceId', async (req, res) => {
	try {
		const service = await Service.findOne({'_id': req.params.serviceId}).exec();
		if (service == null) {
			res.status(404).send();
		} else {
			res.json(service);
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.delete('/:serviceId', async (req, res) => {
	try {
		const service = await Service.findOne({'_id': req.params.serviceId}).exec();
		if (!service.imageUrl.startsWith('http')) {
			fs.unlinkSync(path.join(__dirname, '../../static', service.imageUrl));
		}
		await Service.findOneAndDelete({'_id': req.params.serviceId}).exec();
		res.status(200).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
