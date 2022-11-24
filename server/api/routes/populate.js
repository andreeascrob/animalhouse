const Animal = require('../models/Animal');
const Branch = require('../models/Branch');
const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');
const Service = require('../models/Service');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const animals = [
		{
			name: "Cane",
			slug: "cane",
			iconUrl: "/icons/dog.svg",
		},
		{
			name: "Gatto",
			slug: "gatto",
			iconUrl: "/icons/cat.svg",
		},
		{
			name: "Volatili",
			slug: "volatili",
			iconUrl: "/icons/bird.svg",
		},
		{
			name: "Pesci",
			slug: "pesci",
			iconUrl: "/icons/fish.svg",
		},
		{
			name: "Cavallo",
			slug: "cavallo",
			iconUrl: "/icons/horse.svg",
		},
		{
			name: "Altri animali",
			slug: "altri-animali",
			iconUrl: "/icons/paw.svg",
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
	const accessoriCategory = await ProductCategory.findOne({'slug': 'accessori'}).exec();
	const products = [
		{
			name: "Virtus Dog Adult Rustic",
			slug: "virtus-rustic-cane-adult",
			animalId: caneAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/224339-800-auto",
			description: "Virtus Dog Adult Rustic, alimento secco completo per cani adulti di qualsiasi razza e taglia, ricco di materie prime di origine animale.",
			price: "47.90",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Monge All Breeds Adult Salmone e Riso",
			slug: "monge-all-breeds-cane-adult-salmone-riso",
			animalId: caneAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/270797-800-auto",
			description: "Le crocchette di Monge Salmone e Riso All Breeds Adult sono un alimento completo per cani adulti di tutte le taglie formulato con un'unica fonte proteica: il salmone. Il cibo secco Monge Superpremium Salmone è stato sviluppato pensando al benessere del tuo amico a quattro zampe, grazie alla presenza di sostanze nutritive di qualità frutto della ricerca Made in Italy. Il tuo cane ha delle sensibilità alimentari e non sai quali crocchette scegliere per garantire il suo benessere? Il cibo secco Monge Adult Salmone non solo rinforza il sistema immunitario del tuo cane ma favorisce anche la salute gastrointestinale. Vivete una vita felice, insieme! Il prodotto è disponibile nel formato da 12 KG. Offri al tuo cane un’ottima salute, benessere nutrizionale e tanto gusto: scegli Monge Salmone e Riso All Breeds Adult!",
			price: "45.90",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Acana Pacifica",
			slug: "acana-pacifica",
			animalId: caneAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/268978-800-auto",
			description: "Il cibo secco per cani Acana Pacifica è formulato per valorizzare in maniera naturale tutto il gusto e la freschezza del pregiato pesce delle fredde acque del Pacifico canadese. Le crocchette Acana Pacifica Dog sono un alimento completo per cani adulti che si caratterizza per una ricetta ricca di aringa pescata in natura, sgombro, passera del Pacifico, nasello atlantico e scorfano",
			price: "22.50",
			available: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Acana Classic Red",
			slug: "acana-cane-classic-red",
			animalId: caneAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/275552-800-auto",
			description: "Le crocchette per cani adulti di tutte le razze Acana Classic Red sono un cibo secco ricco di manzo, maiale e agnello, irresistibile anche per cani dai palati più esigenti. I croccantini contengono un’impareggiabile varietà di ingredienti provenienti dal Canada. La scelta di Acana di proporre il consumo di animali interi (preda intera) si inserisce nell’ottica di offrire una dieta ricca e simile a quella che il cane seguirebbe in natura.",
			price: "18.50",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Royal Canin Maxi Adult",
			slug: "royal-canin-size-cane-maxi-adult",
			animalId: caneAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/243808-800-auto",
			description: "Crocchette per cani Royal Canin Size Maxi Adult. Alimento secco completo per cani adulti di grande taglia, con un peso compreso tra i 26 e i 44 kg, dai 15 mesi ai 5 anni di età.",
			price: "26.60",
			available: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Purina Pro Plan Veterinary Diets Ha Hypoallergenic Cane",
			slug: "purina-veterinary-diet-cane-ha-hypoallergenic",
			animalId: caneAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/276183-800-auto",
			description: "Purina Pro Plan Veterinary Diets HA Hypoallergenic è un alimento secco completo formulato per aiutare a livello nutrizionale i cani che soffrono di allergie alimentari. Il tuo cane ha molto prurito o presenta arrossamenti della pelle o infezioni? In questo caso bisogna accertarsi se il cane presenti allergie alimentari. Inoltre potrebbe presentare attacchi frequenti di vomito o diarrea. Sono tutti sintomi di un cane allergico! Per evitare certe reazioni potrebbe essere necessaria una dieta a esclusione, specificamente studiata per il benessere del tuo cane intollerante.",
			price: "17.50",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "KONG Airdog Squeaker Football",
			slug: "kong-cane-air-squeaker-football",
			animalId: caneAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/218548-800-auto",
			description: "La KONG AirDog Squeakair Football combina due classici giocattoli per cani: la pallina da tennis e il giocattolo sonoro, per creare il perfetto giocattolo da riporto.",
			price: "7.20",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Felix Le Ghiottonerie Multipack 80X85G",
			slug: "felix-le-ghiottonerie-multipack-80x85g",
			animalId: gattoAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/266561-800-auto",
			description: "Felix Le Ghiottonerie è un alimento completo, ideale per soddisfare le esigenze nutrizionali dei gatti adulti. Il Multipack è composto da 80 bustine: 20 al gusto Manzo, 20 bustine al Pollo, 20 al gusto Tonno e 20 al gusto Merluzzo. Questi teneri bocconcini di carne vengono conservati in una gelatina per dare all’alimento un sapore inconfondibile. Alimento umido per gatti adulti 100% completo e bilanciato. Felix Le Ghiottonerie non contiene coloranti, aromi e conservanti artificiali. Prodotto disponibile nel formato multipack 80X85G. Il tuo gatto non saprà resistere al profumo e al gusto del suo nuovo pranzetto!",
			price: "29.99",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
	];
	await Product.insertMany(products)
		.then(docs => {
			// res.status(201).send(docs);
		})
		.catch(err => {
			res.status(400).send(err);
		});
	const services = [
		{
			name: "Veterinario",
			description: "Descrizione",
			imageUrl: "https://images.unsplash.com/photo-1630438994394-3deff7a591bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
		},
		{
			name: "Dog sitter",
			description: "Descrizione",
			imageUrl: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
		},
		{
			name: "Toelettatura",
			description: "Descrizione",
			imageUrl: "https://images.unsplash.com/photo-1528846104175-4fd300ee59da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80https://images.unsplash.com/photo-1528846104175-4fd300ee59da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
		},
	];
	await Service.insertMany(services)
		.then(docs => {
			// res.status(201).send(docs);
		})
		.catch(err => {
			res.status(400).send(err);
		});
	const veterinarioService = await Service.findOne({'name': 'Veterinario'}).exec();
	const dogSitterService = await Service.findOne({'name': 'Dog sitter'}).exec();
	const toelettaturaService = await Service.findOne({'name': 'Toelettatura'}).exec();
	const branches = [
		{
			city: "Bologna",
			address: "Via Zamboni, 1",
			servicesSlots: [
				{
					serviceId: veterinarioService._id,
					animalId: caneAnimal._id,
					info: "Evento passato",
					start: "2022-11-19T09:00:00.000Z",
					end: "2022-11-19T10:00:00.000Z",
				},
				{
					serviceId: veterinarioService._id,
					animalId: caneAnimal._id,
					info: "Dott. Tizio, Ambulatorio 1",
					start: "2022-12-19T09:00:00.000Z",
					end: "2022-12-19T10:00:00.000Z",
				},
				{
					serviceId: veterinarioService._id,
					animalId: gattoAnimal._id,
					info: "Dott. Caio, Ambulatorio 3",
					start: "2022-12-19T09:00:00.000Z",
					end: "2022-12-19T10:00:00.000Z",
				},
				{
					serviceId: dogSitterService._id,
					animalId: caneAnimal._id,
					info: "Mario, A domicilio",
					start: "2022-12-19T08:00:00.000Z",
					end: "2022-12-19T18:00:00.000Z",
				},
			],
		},
		{
			city: "Roma",
			address: "Via Celio Vibenna",
			servicesSlots: [
				{
					serviceId: veterinarioService._id,
					animalId: caneAnimal._id,
					info: "Dott. Sempronio, Ambulatorio 10",
					start: "2022-12-19T10:00:00.000Z",
					end: "2022-12-19T11:00:00.000Z",
				},
			],
		},
		{
			city: "Milano",
			address: "Via Celio Vibenna",
		},
	];
	await Branch.insertMany(branches)
		.then(docs => {
			res.status(201).send(docs);
		})
		.catch(err => {
			res.status(400).send(err);
		});
});

module.exports = router;
