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
	const volatiliAnimal = await Animal.findOne({'slug': 'volatili'}).exec();
	const pesciAnimal = await Animal.findOne({'slug': 'pesci'}).exec();
	const cavalloAnimal = await Animal.findOne({'slug': 'cavallo'}).exec();
	const altriAnimal = await Animal.findOne({'slug': 'altri-animali'}).exec();
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
	const curaCategory = await ProductCategory.findOne({'slug': 'cura-e-salute'}).exec();
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
			name: "Cuccia Domus",
			slug: "cuccia-domus",
			animalId: caneAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/227348/canile-domus-extra-large.jpg",
			description: "Ferplast Domus è la cuccia per cani da esterno ottimale per il comfort del tuo amico a quattro zampe, durevole nel tempo, ben isolata dal terreno, accuratamente trattata per resistere alle intemperie climatiche.",
			price: "239.00",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Collare Nylon Rosso",
			slug: "collare-Nylon-Rosso",
			animalId: caneAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/220938/croci-collare-cane-nylon-rosso.jpg",
			description: "Il tuo cane è particolarmente vivace e forte? Il Collare Nylon per cani è allora l'ideale! Questo accessorio è realizzato in robusto nylon, regolabile in 5 lunghezze e facile da aprire e chiudere. Goditi le giornate di sole all'aria aperta con il tuo cane. Il colore rosso rende questo collare alla moda e non farà passare inosservato il tuo amico a quattro zampe.",
			price: "5.80",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Trasportino Sierra in Plastica Eco",
			slug: "trasportino-sierra-in-plastica-eco",
			animalId: caneAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/277813/yes-trasportino-sierra-plastica-eco-blu.jpg",
			description: "Sierra in Plastica Eco trasportino per cani robusto e resistente.",
			price: "9.99",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Gioco per Cane Palla Tpr Verde",
			slug: "lovedi-gioco-cane-palla-tpr-con-punte-verde",
			animalId: caneAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/260658/lovedi-gioco-cane-palla-con-punte-tpr-verde.jpg",
			description: "Gioco Cane Palla Tpr con Punte Verde di Lovedì è una divertente pallina per cani con punte massaggianti per il divertimento quotidiano con Fido. Le delicate punte in gomma tpr massaggiano dolcemente del gengive del tuo cane che potrà divertirsi a mordicchiare il giocattolo. Disponibile in 2 misure: 8 cm e 13 cm. Materiale: TPR​. Gioco Cane Palla Tpr con Punte Verde suona: infatti questo giochino è dotato di squeaker interno​ che stimola il tuo cane a giocare. Colore verde. Disponibile anche in colore fucsia.",
			price: "10.50",
			available: [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Seresto Collare Antiparassitario Cani Grandi",
			slug: "seresto-collare-antiparassitario-cani-oltre-8-kg",
			animalId: caneAnimal._id,
			categoryId: curaCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/269684/seresto-antiparassitario-cane-grande.jpg",
			description: "Se ti stai chiedendo qual è il miglior collare antiparassitario per cani Seresto è la soluzione che garantisce una protezione completa e duratura  contro i parassiti quali pulci e zecche, prevenendo la contrazione di malattie ad essi associate.",
			price: "35.00",
			available: [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Tri-Act 20-40Kg 6 Pipette",
			slug: "frontline-tri-act-spot-on-cane-l-6-pipette-20-40-kg",
			animalId: caneAnimal._id,
			categoryId: curaCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/250423/frontline-tri-act-spot-on-20-40-kg-cani-l-6-p--dv.jpg",
			description: "Frontline Tri-Act Spot-on è un antiparassitario per cani di taglia grande che protegge da flebotomi, zecche e pulci, vettori di malattie pericolose per il pet. La soluzione in 6 pipette da 0,5 ml contiene due principi attivi, Permetrina e Fipronil, che permettono di proteggere il vostro cane dai parassiti ed è inoltre un repellente per pappataci, zanzare e mosche cavalline.",
			price: "44.00",
			available: [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Collare Antiparassitario per Cani Scalibor 65cm",
			slug: "collare-antiparassitario-per-cani-scalibor-65cm",
			animalId: caneAnimal._id,
			categoryId: curaCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/253677/scalibor-grande.jpg",
			description: "Collare antiparassitario per cani grandi Scalibor 65cm, collare antipulci per cani grandi che elimina pulci, zecche e zanzare.",
			price: "27.50",
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
		{
			name: "Virtus Cat Adult Natural Lattina 150G",
			slug: "virtus-cat-adult-natural-lattina-150g",
			animalId: gattoAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/271883/Lattine-con-vassoio_tonno-con-manzo-e-prosciutto-Vista-corrente.jpg",
			description: "I gustosi trancetti Virtus Nature Deep Sea Formula Tonno sono un cibo umido complementare per gatto adulto altamente proteico, con il 74% di ingredienti di origine animale.",
			price: "1.59",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Royal Canin Sterilized Gatto",
			slug: "royal-canin-sterilized-gatto",
			animalId: gattoAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/238812/royal-canin-sterilized-gatto.jpg",
			description: "Le crocchette per gatto Royal Canin Sterilised sono specificamente studiate per il metabolismo dei gatti adulti sterilizzati. Questo cibo secco è perfetto per gatti castrati fino a 7 anni d'età.",
			price: "71.00",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Brekkies Cat Bontà e Benessere Urinary Care",
			slug: "brekkies-gatto-bonta-e-benessere",
			animalId: gattoAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/270580/brekkies-cat-bonta-benessere-urinary-care-20kg.jpg",
			description: "Brekkies Cat Bontà e Benessere, alimento secco per gatti adulti formulato in modo da ridurre il rischio di formazione di calcoli alle vie urinarie, disturbo a cui i gatti sono particolarmente predisposti. I croccantini sono ricoperti con una delicata salsa di carne, che rende Brekkies un alimento molto appetitoso, apprezzato anche dai gatti più esigenti. Brekkies Bontà & Benessere è un prodotto completo ed equilibrato per gatti adulti che favorisce un sistema urinario sano. Brekkies aiuta a migliorare il benessere del tuo gatto per garantirgli una vita sana e felice.",
			price: "56.90",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Tiragraffi Badalona Beige",
			slug: "trixie-gatto-tiragraffi-badalona-beige",
			animalId: gattoAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/223801/trixie-gatto-tiragraffi-badalona-beige.jpg",
			description: "Il tiragraffi per gatti Badalona di trixie è un pratico e funzionale tiragraffi utile ad ogni esigenza del tuo felino. È rivestito in morbidissimo e soffice peluche, un materiale adorato dal tuo gatto, su cui riposerà indisturbato. Il tronchetto in sisal asseconda l'esigenza del tuo felino di affilare e levigare le sue unghie, senza danneggiarle. Questo bellissimo tiragraffi si adatterà facilmente all'arredamento di casa tua, grazie al suo design raffinato e la sua altezza di 109 CM.",
			price: "50.00",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Gioco Gatto Bacchetta Con Piume CM.50",
			slug: "gioco-gatto-bacchetta-con-piume",
			animalId: gattoAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/273112/LOVEDI-GIOCO-GATTO-BACCHETTA-CON-PIUME-CM.50.jpg",
			description: "Gioco Gatto Bacchetta Con Piume di Lovedi è un gioco per gatti con piume e strisce per far divertire il tuo felino.",
			price: "2.55",
			available: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Gioco Gatto Canna Da Pesca Con Pesce",
			slug: "gioco-gatto-canna-da-pesca-con-pesce",
			animalId: gattoAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/273114/LOVEDI-GIOCO-GATTO-CANNA-DA-PESCA-CON-PESCE-CM.42.jpg",
			description: "Gioco Gatto Canna Da Pesca Con Pesce CM.42 di Lovedi è un gioco per gatti con piume e strisce per far divertire il tuo felino.",
			price: "4.30",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Frontline Combo Gatti 6 Pipette",
			slug: "frontline-combo-spot-on-gatto-6-pipette",
			animalId: gattoAnimal._id,
			categoryId: curaCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/206637/Frontline-Combo-Spot-On-Gatto-e-Furetto-6-pipette.png",
			description: "Frontline Combo 6 Pipette è un efficace antiparassitario per gattini e gatti adulti che garantisce una protezione ottimale contro le infestazioni di pulci, zecche e pidocchi.",
			price: "36.90",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Gellini Remover",
			slug: "gellini-gatto-remover-12-pz",
			animalId: gattoAnimal._id,
			categoryId: curaCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/220953/gellini-gatto-remover-12-pz.jpg?v=1761374007",
			description: "La particolare abitudine dei gatti di leccarsi frequentemente il mantello determina una continua ingestione di peli che accumulandosi sono spesso causa di turbe digerenti. Questo prodotto in forma di pasta è utile per regolare le funzioni intestinali e per favorire una perfetta assimilazione degli alimenti consentendo al tempo stesso l'eliminazione dei boli di pelo.",
			price: "15.20",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Snack per Pappagalli Kracker Uova",
			slug: "vitakraft-pappagalli-kracker-uovo-uova",
			animalId: volatiliAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/221542/vitakraft-pappagalli-kracker-uovo-uova.jpg",
			description: "Vitakraft Kracker uova per pappagalli è lo snack ideale per supportare il sistema immunitario del tuo amico pennuto e sostenerlo con vitamine pregiate. Questo snack è stato preparato appositamente per il fabbisogno nutrizionale dei pappagallini.",
			price: "2.30",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Expecial Granmix Canarini",
			slug: "expecial-granmix-canarini",
			animalId: volatiliAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/252525/Gran_Mix_CANARINI.jpg",
			description: "Il Mangime per canarini Expecial è un mix appetitoso di semi e cereali selezionati, arricchito con l’integrazione del biscotto. La miscela dovrebbe essere sempre presente all’interno della gabbietta dei nostri amici e lasciata a libera disposizione in modo che il canarino possa assumerla a piacimento durante il giorno e divertirsi a becchettare i semini.",
			price: "4.44",
			available: [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "In The Nature Pappagallini Sticks Miele e Ananas",
			slug: "in-the-nature-pappagallini-sticks-miele-e-ananas",
			animalId: volatiliAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/276668/PAPPAGALLINI_Miele_Ananas.jpg",
			description: "Gli stick con miele e ananas di In The Nature sono un alimento complementare per pappagallini e uccelli esotici da compagnia. Gli stick In The Nature forniscono a questi uccelli un ottimale apporto di sostanze nutritive grazie alla presenza di miele, fonte di energia, e ananas, fonte di vitamine e minerali.",
			price: "3.10",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Expecial Granmix Parrocchetti",
			slug: "expecial-granmix-parrocchetti-1-kg",
			animalId: volatiliAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/252527/Gran_Mix_PARROCCHETTI.jpg",
			description: "La miscela di semi per parrocchetti Expecial è un appetitoso mangime composto da semi e cereali selezionati, arricchito da un delizioso biscotto. Il mix di semi per uccelli dovrebbe essere sempre presente all’interno della gabbietta dei tuoi amici volatili e lasciata a libera disposizione in modo che il parrocchetto possa assumerla a piacimento durante il giorno e divertirsi a becchettare i semini.",
			price: "3.92",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Expecial Uccelli Palla Grasso Singola",
			slug: "expecial-uccelli-palla-grasso-singola-85g",
			animalId: volatiliAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/206408/Expecial-Palla-di-Grasso-Singola-85g.jpg",
			description: "Le palle di grasso Expecial sono un importante alimento per gli uccellini liberi, in quanto ricche di nutrienti e altamente energetiche. Ideali da somministrare durante tutto l’anno, soprattutto nelle stagioni fredde, quando faticano maggiormente a reperire il cibo. Si consiglia di appendere le palle di grasso direttamente ai rami degli alberi o inserirle nell’apposita mangiatoia e lasciarle a libera disposizione.",
			price: "0.55",
			available: [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Gabbia per Uccelli Helsinki",
			slug: "yes-gabbia-per-uccelli-helsinki",
			animalId: volatiliAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/265383/gabbia-per-uccelli-helsinki1.jpg",
			description: "La gabbia per uccelli Helsinki è ideale per canarini, cocorite e piccoli esotici. Le gabbie per uccelli sono più di un semplice bisogno di base per i piccoli volatili domestici. La voliera è la casa dove troveranno sicurezza, comfort e libertà allo stesso tempo.",
			price: "78.90",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Ferplast Gabbia Uccelli Giulietta Nera",
			slug: "gabbia-uccelli-giulietta-nera",
			animalId: volatiliAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/253163/Ferplast-gabbia-uccelli-giulietta-.jpg",
			description: "Gabbia in legno per canarini e uccelli esotici Giulietta di Ferplast, disponibile in tre misure, con griglia di colore nero.",
			price: "99.00",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Trespolo per Pappagalli",
			slug: "trespolo-cm-75x70x134",
			animalId: volatiliAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/223484/trespolo-cm-75x70x134.jpg",
			description: "Il trespolo è un oggetto che non può assolutamente mancare a chi possiede un pappagallo. Il Trespolo firmato Croci è un prodotto raffinato, ideale per pappagalli anche di grossa taglia. Il prodotto si caratterizza per avere dei supporti in legno e il fondo in metallo per contenere la lettiera. Sono presenti delle comode ciotole sospese utili per contenere acqua e cibo; facilmente rimovibili e facili da pulire. Misura del prodotto 75X70X134 cm.",
			price: "150.00",
			available: [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Gabbia per Uccelli Tokyo",
			slug: "yes-gabbia-per-uccelli-tokyo",
			animalId: volatiliAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/265418/gabbia-per-uccelli-tokyo1.jpg",
			description: "La gabbia per uccelli Tokyo è ideale per canarini, cocorite e piccoli esotici. Produzione italiana. Questa spaziosa casetta per uccelli è più di una semplice gabbia: è la casa dove troveranno sicurezza e libertà allo stesso tempo.",
			price: "32.00",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Neo Foractil Spray per Uccelli 300 ml",
			slug: "neo-foractil-spray-uccelli-ml-300",
			animalId: volatiliAnimal._id,
			categoryId: curaCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/221529/neo-foractil-spray-uccelli-ml-300--dv.jpg",
			description: "Neo Foractil spray per uccelli è un insetticida acaricida efficace contro i parassiti dei volatili egli insetti dell'ambiente di allevamento (mosche, zanzare, formiche, ecc.). È Particolarmente attivo contro gli acari e pidocchi che comunemente infestanti i volatili. Si impiega direttamente sugli animali e sulle attrezzature.",
			price: "9.20",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Pietra Minerale Mini per Uccelli",
			slug: "vitafit-pietra-minerale-mini-uccelli",
			animalId: volatiliAnimal._id,
			categoryId: curaCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/266257/vitakraft-pietra-minerale-mini-per-uccelli-40g.jpg",
			description: "Mineral Mini è una pietra minerale per uccelli ricca di sali minerali, oligoelementi, calcare naturale e calcina fosforosa. Il prodotto favorisce la formazione delle loro ossa e regola la digestione dei volatili. Miineral Mini inoltre è ideale per il processo di limatura del becco, tanto importante per gli uccelli da compagnia. La formulazione della ricetta non prevede l’utilizzo di coloranti e sostanze conservanti. Con un pratico dispositivo di fissaggio alla gabbia. Dona ai tuoi amici pennuti tutti i sali minerali di cui hanno bisogno, per una vita longeva e sana.",
			price: "1.95",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Melody Mix Gr.300 Semi D. Salute",
			slug: "melody-mix-gr-300-semi-d--salute",
			animalId: volatiliAnimal._id,
			categoryId: curaCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/221584/melody-mix-gr-300-semi-d--salute.jpg",
			description: "Padovan Melody Mix with Garden Seeds è un miscuglio vitaminizzato di semi e cereali tradizionali per uccellini, arricchito con semi ortivi, e con biscotti sbriciolati. I cibi di complemento rendono più varia la dieta degli uccelli e assicurano i fabbisogni nutrizionali in particolari periodi, come durante la muta e la riproduzione. Padovan Melody Mix with Garden Seeds: un prodotto di eccellenza, per offrire la migliore qualità al tuo amico pennuto!",
			price: "2.15",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Pietra Iodio per uccelli",
			slug: "tx-pietra-iodio-gr-20",
			animalId: volatiliAnimal._id,
			categoryId: curaCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/257906/212978_PHO_PRO_CLIP_5101-1.jpg",
			description: "Pietra con iodio per volatili, un prodotto naturale per rafforzare il becco e per facilitare la muta. Contenuto 20g. Ideale per canarini, cocoriti e altri piccoli uccelli.",
			price: "1.29",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Expecial Mangime Pesci Rossi Granuli",
			slug: "expecial-pesci-rossi-mangime-granuli",
			animalId: pesciAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/227009/expecial-pesci-rossi-mangime-granuli.jpg",
			description: "I granuli Expecial sono il mangime ideale per fornire un'alimentazione completa e bilanciata ai tuoi pesci rossi. Inoltre il galleggiamento dei granuli va incontro alle naturali abitudini alimentari dei pesci.",
			price: "3.70",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Mangime per Pesci in Fiocchi",
			slug: "tetra-mangime-per-pesci-in-fiocchi",
			animalId: pesciAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/272711/tetramin-flakes.jpg",
			description: "TetraMin Flakes è un mangime in fiocchi biologicamente bilanciato che garantisce un'alimentazione quotidiana completa adatta a tutti i pesci ornamentali.",
			price: "9.50",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Mangime per Pesci Guppy in Fiocchi",
			slug: "tetra-mangime-per-pesci-guppy-in-fiocchi",
			animalId: pesciAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/272714/tetra-guppy-mini-flakes.jpg",
			description: "Tetra Guppy Mini Flakes sono fiocchi appositamente formulati per soddisfare le esigenze nutrizionali dei pesci guppy e altri pesci vivipari quali platy, molly e portaspada.",
			price: "2.95",
			available: [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Reptomin Menu",
			slug: "reptomin-menu",
			animalId: pesciAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/272705/REPTOMIN-MENU-ML.250-PZ48.jpg",
			description: "Mini Krill per favorire la crescita, Mini Sticks per carapace ed ossa sani.",
			price: "5.30",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Amtra Pro Pond Flake",
			slug: "amtra-pro-pond-flake",
			animalId: pesciAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/258487/amtra-pro-pond-flake-5000-ml.jpg",
			description: "Amtra Pro Pond Flake Ml.5000, Mangime completo per pesci rossi e carpe Koi. Adatto per l’uso sia in acquario che nei laghetti ornamentali. Alimento in scaglie che mantengono la loro forma compatta e non inquinano l’acqua.",
			price: "9.40",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Aquaart Discovery Line Led Antracite",
			slug: "tetra-aquaart-discovery-line-antracite-led",
			animalId: pesciAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/254395/aquaart-dicsovery-line-led-antracite--1-.jpg",
			description: "Acquario completo Aquaart Discovery Line Led in versione grigia antracite di Tetra, con vetro anteriore ricurvo e design moderno a mezzaluna. Acquario in vetro di alta qualità, dimensione 61 x 33,5 x 42,7 cm, capacità 60 litri.",
			price: "135.00",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Amtra Modern Tank 40 Led",
			slug: "amtra-modern-tank-40-led",
			animalId: pesciAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/258807/amtra-modern-tank-40-led.jpg",
			description: "Acquario in vetro extra chiaro con filtro Filpo Click 250 lt/h ed illuminazione Full Led 9 Watt.",
			price: "84.90",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Acquario Wave Laguna Led",
			slug: "wave-laguna-led",
			animalId: pesciAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/222830/wave-laguna-led-lt-16-cm-30.jpg",
			description: "L'acquario Wave Laguna Led è realizzato in vetro da 4mm. Comprensivo di impianto di illuminazione LED (led bianchi 8.500°K) e filtro interno “a percolazione”.",
			price: "54.90",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Riscaldatore Klima Evo",
			slug: "amtra-riscaldatore-klima-evo",
			animalId: pesciAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/258476/amtra-riscaldatore-klima-evo1.jpg",
			description: "Amtra Riscaldatore Klima Evo, riscaldatore automatico per acquari in quarzo infrangibile, completamente sommergibile.",
			price: "14.70",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Chaps Pioneer in pelle ingrassata",
			slug: "chaps-pelle-ingrassata-equitazione-pioneer",
			animalId: cavalloAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://nonsolocavallo.b-cdn.net/foto/pe00100f-c.jpg",
			description: "I chaps si indossano sopra l'abbigliamento sportivo.",
			price: "118.49",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "In the Nature Conigli Nani Pellet Per Cuccioli",
			slug: "in-the-nature-conigli-nani-pellet-per-cuccioli",
			animalId: altriAnimal._id,
			categoryId: alimentazioneCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/207245/In-The-Nature-alimento-per-conigli-nani-cuccioli-800g.jpg",
			description: "In the Nature è un alimento studiato per soddisfare al meglio i bisogni nutrizionali dei conigli nani cuccioli e sostenerli durante le fasi della crescita con i migliori ingredienti.",
			price: "3.49",
			available: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		{
			name: "Gabbia Scoiattoli Kd",
			slug: "gabbia-roditori-scoiattoli-kd-grigia",
			animalId: altriAnimal._id,
			categoryId: accessoriCategory._id,
			imageUrl: "https://arcaplanet.vtexassets.com/arquivos/ids/254172/Gabbia-uccelli-ferplast-kd.jpg",
			description: "La gabbia Kd Ferplast per scoiattoli, degu e ratti viene creata ad hoc per ospitare nell'ambiente domestico questi particolari roditori. Scoiattoli Kd è un habitat specifico con una struttura con profili in plastica, di massima resistenza e durata.",
			price: "100.00",
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
			description: "Il veterinario si occupa principalmente di prevenzione e cura delle malattie degli animali: effettua visite veterinarie per verificare lo stato di salute di cuccioli e animali adulti, analizza i sintomi e formula diagnosi. Se necessario, effettua anche prelievi, esami e analisi cliniche per stabilire il trattamento migliore.",
			imageUrl: "https://images.unsplash.com/photo-1630438994394-3deff7a591bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
		},
		{
			name: "Dog sitter",
			description: "I pet sitters di Pawshake forniscono tante attenzioni in un amorevole ambiente domestico e possono soddisfare in modo specifico le esigenze del tuo animale domestico. Nessun costo di abbonamento e nessun obbligo.",
			imageUrl: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
		},
		{
			name: "Toelettatura",
			description: "La toelettatura è un'insieme di attività di pulizia fondamentali, che vanno dal lavaggio alla spazzolatura del manto, dal taglio del pelo all’igiene delle varie parti del corpo del cane, come orecchie, denti e taglio delle unghie.",
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
					start: "2023-12-19T09:00:00.000Z",
					end: "2023-12-19T10:00:00.000Z",
				},
				{
					serviceId: veterinarioService._id,
					animalId: gattoAnimal._id,
					info: "Dott. Caio, Ambulatorio 3",
					start: "2023-12-19T09:00:00.000Z",
					end: "2023-12-19T10:00:00.000Z",
				},
				{
					serviceId: dogSitterService._id,
					animalId: caneAnimal._id,
					info: "Mario, A domicilio",
					start: "2023-12-19T08:00:00.000Z",
					end: "2023-12-19T18:00:00.000Z",
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
					start: "2023-12-19T10:00:00.000Z",
					end: "2023-12-19T11:00:00.000Z",
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
