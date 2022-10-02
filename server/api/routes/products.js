const Animal = require("../models/Animal");
const Product = require("../models/Product");
const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
	try {
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

router.delete('/:productSlug', async (req, res) => {
	try {
		await Product.findByOneAndDelete({'slug': req.params.productSlug}).exec();
		res.status(200).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
