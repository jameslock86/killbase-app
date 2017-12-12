let express = require('express');
let router = express.Router();
let knexFile = require('../knexfile')['development'];
let knex = require('knex')(knexFile);


router.get('/', function(req, res) {
	knex('assassins')
		.then(function(assassins) {
			// return them to the client-side
			res.send(assassins);
		})
		.catch(function(error) {
			res.sendStatus(500);
		});
});

router.get('/:assassin_id', function(req, res) {
	let id = req.params.assassin_id;

	if (Number.isNaN(parseInt(id))) {
		res.sendStatus(404);
	}

	knex('assassins').where('id', id).first()
		.then(function(assassin) {
			res.send(assassin);
		})
		.catch(function(error) {
			res.sendStatus(500);
		});
});

router.post('/', function(req, res, next) {
	knex('assassins').insert({
		full_name: req.body.full_name,
		code_names: req.body.code_names,
		// weapon:req.body.weapon,
		age: req.body.age,
		price: req.body.price,
		rating: req.body.rating,
		kills: req.body.kills
	}, '*')
		.then(function(assassins) {
			res.send(assassins[0]);
		})
		.catch((err) => {
			next(err);
		});
});

module.exports = router;
