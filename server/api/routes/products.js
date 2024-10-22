const Animal = require("../models/Animal");
const Product = require("../models/Product");
const express = require("express");
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
		const newProduct = new Product(req.body);
		await newProduct.save();
		res.status(201).send(newProduct);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/', async (req, res) => {
	try {
		let query = {};
		if (req.query.animalId) {
			query['animalId'] = req.query.animalId;
		}
		if (req.query.animalSlug) {
			const animal = await Animal.findOne({'slug': req.query.animalSlug}).exec();
			query['animalId'] = animal._id.toString();
		}
		if (req.query.categoryId) {
			query['categoryId'] = req.query.categoryId;
		}
		if (req.query.name) {
			query['$or'] = [{'name': {$regex: req.query.name, $options: "i"}}, {'description': {$regex: req.query.name, $options: "i"}}];
		}
		const products = await Product.find(query).exec();
		res.send(products);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/:productSlug', async (req, res) => {
	try {
		const product = await Product.findOne({'slug': req.params.productSlug}).exec();
		if (product == null) {
			res.status(404).send();
		} else {
			res.send(product);
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.patch('/:productSlug', upload.single('image'), async (req, res) => {
	try {
		if (req.file) {
			req.body['imageUrl'] = '/uploads/' + req.file.filename;
			const product = await Product.findOne({'slug': req.params.productSlug}).exec();
			if (!product.imageUrl.startsWith('http')) {
				fs.unlinkSync(path.join(__dirname, '../../static', product.imageUrl));
			}
		}
		await Product.updateOne({'slug': req.params.productSlug}, req.body).exec();
		res.status(202).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.delete('/:productSlug', async (req, res) => {
	try {
		const product = await Product.findOne({'slug': req.params.productSlug}).exec();
		if (!product.imageUrl.startsWith('http')) {
			fs.unlinkSync(path.join(__dirname, '../../static', product.imageUrl));
		}
		await Product.findOneAndDelete({'slug': req.params.productSlug}).exec();
		res.status(200).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
