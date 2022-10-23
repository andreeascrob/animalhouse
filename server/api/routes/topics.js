const Animal = require("../models/Animal");
const Topic = require("../models/Topic");
const express = require("express");
const router = express.Router();
var { expressjwt: jwt } = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

router.post('/', jwt({secret: jwtSecret, algorithms: ["HS256"], credentialsRequired: true}), async (req, res) => {
	try {
		let topicData = {};
		topicData['title'] = req.body.title;
		topicData['authorId'] = req.auth;
		const animalId = await Animal.findOne({'slug': req.body.animalSlug}).select('_id').exec();
		topicData['animalId'] = animalId._id.toString();
		if (!['eccolo-qua', 'cerco-partner', 'aiutatemi'].includes(req.body.board)) {
			res.status(400).send('Invalid board');
			return;
		}
		topicData['board'] = req.body.board;
		topicData['text'] = req.body.text;
		const newTopic = new Topic(topicData);
		await newTopic.save();
		res.status(201).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/', async (req, res) => {
	try {
		let query = {};
		if (req.query.animalSlug && req.query.board) {
			const animal = await Animal.findOne({'slug': req.query.animalSlug}).select('_id').exec();
			query['animalId'] = animal._id.toString();
			query['board'] = req.query.board;
			const topics = await Topic.find(query).select('-comments').exec();
			res.status(200).send(topics);
		} else {
			res.status(400).send('animalSlug and board query parameters are mandatory');
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const topic = await Topic.findOne({'_id': req.params.id}).exec();
		res.status(200).send(topic);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.delete('/:id', jwt({secret: jwtSecret, algorithms: ["HS256"], credentialsRequired: true}), async (req, res) => {
	try {
		const topic = await Topic.findOne({'_id': req.params.id}).exec();
		if (req.auth == topic.authorId) {
			await Topic.findByIdAndDelete(req.params.id).exec();
			const animal = await Animal.findOne({'_id': topic.animalId}).select('slug').exec();
			res.status(200).send({'animalSlug': animal.slug});
		} else {
			res.status(403).send('Only the author can delete a topic');
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.post('/:id/comments', jwt({secret: jwtSecret, algorithms: ["HS256"], credentialsRequired: true}), async (req, res) => {
	try {
		await Topic.updateOne(
			{'_id': req.params.id},
			{$push: {'comments': {
				'authorId': req.auth,
				'text': req.body.text
			}}}).exec();
		const topic = await Topic.findOne({'_id': req.params.id}).exec();
		res.status(201).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.delete('/:id/comment/:commentId', jwt({secret: jwtSecret, algorithms: ["HS256"], credentialsRequired: true}), async (req, res) => {
	try {
		const topic = await Topic.findOne({'_id': req.params.id}).exec();
		if (req.auth == topic.comments.id(req.params.commentId).authorId) {
			await topic.comments.pull({'_id': req.params.commentId});
			await topic.save();
			res.status(200).send();
		} else {
			res.status(403).send('Only the author can delete a comment');
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
