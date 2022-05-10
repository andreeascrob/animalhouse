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
	const products = await Product.find().exec();
	res.send(products);
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
