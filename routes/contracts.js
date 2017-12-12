let express = require('express');
let router = express.Router();
let knexFile = require('../knexfile')['development'];
let knex = require('knex')(knexFile);

//route for the contracts all get:
router.get('/', function(req, res) {
	knex('contracts')
		.then(function(contracts) {
			// return them to the client-side
			res.send(contracts);
		})
		.catch(function(error) {
			res.sendStatus(500);
		});
});

router.get('/:contract_id', function(req, res) {
	let id = req.params.contract_id;

	if (Number.isNaN(parseInt(id))) {
		res.sendStatus(404);
	}

	knex('contracts').where('id', id).first()
		.then(function(contract) {
			res.send(contract);
		})
		.catch(function(error) {
			res.sendStatus(500);
		});
});

router.post('/', function(req, res, next) {
	knex('contracts').insert({
		client_id: req.body.client_id,
		completed: req.body.completed,
		completed_by: req.body.completed_by,
		price: req.body.price,
		target_id: req.body.target_id

	}, '*')
		.then(function(contracts) {
			res.send(contracts[0]);
		})
		.catch((err) => {
			next(err);
		});
});
router.patch('/:id', function(req, res, next) {
	knex('contracts')
		.where('id', req.params.id)
		.first()
		.then(function(contracts) {
			if (!contracts) {
				return next();
			}
			return knex('contracts')
				.update({
					client_id: req.body.client_id,
					completed: req.body.completed,
					completed_by: req.body.completed_by,
					price: req.body.price,
					target_id: req.body.target_id

				}, '*')
				.where('id', req.params.id);
		})
		.then((contracts) => {
			res.send(contracts[0]);
		})
		.catch((err) => {
			next(err);

		});
});
router.delete('/:id',function (req,res,next) {
	let contracts;
	knex('contracts')
		.where('id',req.params.id)
		.first()
		.then(function (row) {
			if (!row){
				return next();
			}
			contracts = row;
			return knex('contracts')
				.del()
				.where('id',req.params.id);
		})
		.then(function () {
			delete contracts.id;
			res.send(contracts);
		})
		.catch(function (err) {
			next(err);
		});
});








module.exports = router;
