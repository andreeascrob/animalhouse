const Animal = require("../models/Animal");
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
	const animals = [
		{
			name: "Cane",
			slug: "cane",
		},
		{
			name: "Gatto",
			slug: "gatto",
		},
	];
	await Animal.insertMany(animals)
		.then(docs => {
			// res.status(201).send(docs);
		})
		.catch(err => {
			res.status(400).send(err);
		});
	const caneAnimal = await Animal.findOne({'slug': 'cane'}).exec();
	const gattoAnimal = await Animal.findOne({'slug': 'gatto'}).exec();
	const categories = [
		{
			name: "Alimentazione",
			slug: "alimentazione",
		},
		{
			name: "Accessori",
			slug: "accessori",
		},
		{
			name: "Cura e salute",
			slug: "cura-e-salute",
		},
	];
	await ProductCategory.insertMany(categories)
		.then(docs => {
			// res.status(201).send(docs);
		})
		.catch(err => {
			res.status(400).send(err);
		});
	const alimentazioneCategory = await ProductCategory.findOne({'slug': 'alimentazione'}).exec();
	const accessoriAnimal = await ProductCategory.findOne({'slug': 'accessori'}).exec();
	const products = [
		{
			name: "Virtus Dog Adult Rustic",
			slug: "virtus-rustic-cane-adult",
			animalId: caneAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/224339-800-auto",
			description: "Virtus Dog Adult Rustic, alimento secco completo per cani adulti di qualsiasi razza e taglia, ricco di materie prime di origine animale.",
			price: "47.90"
		},
		{
			name: "Monge All Breeds Adult Salmone e Riso",
			slug: "monge-all-breeds-cane-adult-salmone-riso",
			animalId: caneAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/270797-800-auto",
			description: "Le crocchette di Monge Salmone e Riso All Breeds Adult sono un alimento completo per cani adulti di tutte le taglie formulato con un'unica fonte proteica: il salmone. Il cibo secco Monge Superpremium Salmone è stato sviluppato pensando al benessere del tuo amico a quattro zampe, grazie alla presenza di sostanze nutritive di qualità frutto della ricerca Made in Italy. Il tuo cane ha delle sensibilità alimentari e non sai quali crocchette scegliere per garantire il suo benessere? Il cibo secco Monge Adult Salmone non solo rinforza il sistema immunitario del tuo cane ma favorisce anche la salute gastrointestinale. Vivete una vita felice, insieme! Il prodotto è disponibile nel formato da 12 KG. Offri al tuo cane un’ottima salute, benessere nutrizionale e tanto gusto: scegli Monge Salmone e Riso All Breeds Adult!",
			price: "45.90"
		},
	];
	await Product.insertMany(products)
		.then(docs => {
			res.status(201).send(docs);
		})
		.catch(err => {
			res.status(400).send(err);
		});
});

module.exports = router;
