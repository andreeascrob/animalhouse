const Score = require('../models/Score');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const newScore = new Score(req.body);
		await newScore.save();
		res.status(201).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/:game', async (req, res) => {
	const scores = await Score.find({'game': req.params.game}).lean().exec();
	scores.sort((a, b) => a['score'] > b['score'] ? -1 : 1);
	res.send(scores);
});

module.exports = router;
