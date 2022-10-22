const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const express = require("express");
const router = express.Router();
var { expressjwt: jwt } = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

router.post('/', jwt({secret: jwtSecret, algorithms: ["HS256"], credentialsRequired: false},), async (req, res) => {
	try {
		let products = [];
		for (var productSlug in req.body.cart) {
			let product = await Product.findOne({'slug': productSlug}).exec();
			products.push({'slug': product.slug, 'price': product.price, 'quantity': req.body.cart[productSlug]});
		}
		console.log(products.length);
		if (products.length > 0) {
			delete req.body.productsSlugs;
			req.body.products = products;
			const order = new Order(req.body);
			if (req.headers.authorization) {
				await User.update(
					{'_id': req.auth},
					{$set: {
						'address': req.body.address,
						'city': req.body.city
					}}
				);
				const user = await User.findOne({'_id': req.auth}).exec();
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
