let express = require('express');
let router = express.Router();
let knexFile = require('../knexfile')['development'];
let knex = require('knex')(knexFile);

//route for the contracts all get:
router.get('/', function(req, res) {
	knex('contracts')
		.then(function(contracts) {
			// return them to the client-side
			res.render('contracts', {
				contracts
			});
		})
		.catch(function(error) {
			res.sendStatus(500);
		});
});
router.get('/new', function(req, res) {
	res.render('contracts_post');
});
//console.log('hello from contracts top');
router.post('/', function(req, res) {
	//console.log('inside contracts post', req.body);
	knex('contracts').insert({
		client_id: req.body.client_id,
		target_id: req.body.target_id,
		price: req.body.price,
		completed: req.body.completed,
		completed_by: req.body.completed_by
	}, '*')
		.then(function(contracts) {
			//console.log('hello from inside post');
			// res.render('contracts_post', {'contracts': contracts[0]});
			res.redirect('/contracts');
		})
		.catch((error) => {

			console.log(error);
		});
});

router.get('/:id/update', function(req, res) {
	let id = req.params.id;
	let updatedbody = req.body;
	knex('contracts')
		.where({
			id
		})
		.then(function(updatedbody) {

			res.render('contracts_update', updatedbody[0]);
		});
});
router.put('/:id', function(req, res) {
	let id = req.params.id;
	knex('contracts')
		.where({id: id})
		.returning(id)
		.update({
			client_id: req.body.client_id,
			completed: req.body.completed,
			completed_by: req.body.completed_by,
			price: req.body.price,
			target_id: req.body.target_id
		}, '*')
		.then(function(updatedbody) {
			res.redirect('/contracts');
		})
		.catch((error) => {
			console.log(error);
		});
});




router.get('/:id', function(req, res) {
	res.render('contracts_delete', {
		'id': req.body.id
	});
});
router.delete('/:id', function(req, res, next) {
	let contracts;
	knex('contracts')
		.where('id', parseInt(req.body.id))
		.first()
		.then(function(row) {
			if (!row) {
				return next();
			}
			contracts = row;
			return knex('contracts')
				.del()
				.where('id', req.body.id);
		})
		.then(function() {
			delete contracts.id;
			res.redirect('/contracts');
		})
		.catch(function(err) {
			next(err);
		});
});








// router.get('/:contract_id', function(req, res) {
// 	let id = req.params.contract_id;
//
// 	if (Number.isNaN(parseInt(id))) {
// 		res.sendStatus(404);
// 	}
//
// 	knex('contracts').where('id', id).first()
// 		.then(function(contract) {
// 			res.send(contract);
// 		})
// 		.catch(function(error) {
// 			res.sendStatus(500);
// 		});
// });





//
// router.patch('/:id', function(req, res, next) {
// 	knex('contracts')
// 		.where('id', req.params.id)
// 		.first()
// 		.then(function(contracts) {
// 			if (!contracts) {
// 				return next();
// 			}
// 			return knex('contracts')
// .update({
// 	client_id: req.body.client_id,
// 	completed: req.body.completed,
// 	completed_by: req.body.completed_by,
// 	price: req.body.price,
// 	target_id: req.body.target_id
//
// 				}, '*')
// 				.where('id', req.params.id);
// 		})
// 		.then((contracts) => {
// 			res.send(contracts[0]);
// 		})
// 		.catch((err) => {
// 			next(err);
//
// 		});
// });
module.exports = router;
