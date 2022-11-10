const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
var { expressjwt: jwt } = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

router.post('/', jwt({secret: jwtSecret, algorithms: ['HS256'], credentialsRequired: false},), async (req, res) => {
	try {
		let products = [];
		let remainingQuantities = [];
		for (var productSlug in req.body.cart) {
			let product = await Product.findOne({'slug': productSlug}).exec();
			if (req.body.cart[productSlug] > product.available[0]) {
				remainingQuantities.push({'name': product.name, 'slug': product.slug, 'quantity': product.available[0]});
			} else {
				products.push({'slug': product.slug, 'price': product.price, 'quantity': req.body.cart[productSlug]});
			}
		}
		if (remainingQuantities.length > 0) {
			res.status(409).send(remainingQuantities);
		} else if (products.length > 0) {
			delete req.body.productsSlugs;
			req.body.products = products;
			products.forEach(async (product) => {
				await Product.updateOne(
					{'slug': product.slug},
					{$inc: {
						'available.0': -product.quantity
					}}
				);
			});
			const order = new Order(req.body);
			if (req.headers.authorization) {
				await User.updateOne(
					{'_id': req.auth},
					{$set: {
						'address': req.body.address,
						'city': req.body.city
					}}
				);
			}
			res.status(201).send();
		} else {
			res.status(400).send('Empty cart');
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
