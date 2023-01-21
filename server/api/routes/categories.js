const express = require("express");
const ProductCategory = require("../models/ProductCategory");
const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const newProductCategory = new ProductCategory(req.body);
		await newProductCategory.save();
		res.status(201).send(newProductCategory);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/', async (req, res) => {
	const productCategories = await ProductCategory.find().exec();
	res.send(productCategories);
});

router.get('/:productCategorySlug', async (req, res) => {
	try {
		const productCategory = await ProductCategory.findOne({'slug': req.params.productCategorySlug}).exec();
		if (productCategory == null) {
			res.status(404).send();
		} else {
			res.json(productCategory);
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.delete('/:productCategorySlug', async (req, res) => {
	try {
		await ProductCategory.findOneAndDelete({'slug': req.params.productCategorySlug}).exec();
		res.status(200).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
