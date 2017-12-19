let express = require('express');
let router = express.Router();
let knexFile = require('../knexfile')['development'];
let knex = require('knex')(knexFile);
//const app = require('express')();

//get for assassins wit ejs
router.get('/', function(req, res) {
	// console.log('here in assassins route1');
	knex('assassins')
		.then(function(assassins) {
			// return them to the client-side
			res.render('assassins', {
				assassins
			});
		})
		.catch(function(error) {
			res.sendStatus(500);
		});
});

// works to get my post section
router.get('/new', function(req, res) {
	res.render('assassins_post');
});
//console.log('hello fro assassins poster');
router.post('/', function(req, res) {
	console.log('req body', req.body);
	knex('assassins').insert({
		full_name: req.body.full_name,
		code_names: req.body.code_names,
		weapon: req.body.weapon,
		age: req.body.age,
		price: req.body.price,
		rating: req.body.rating,
		kills: req.body.kills
	}, '*')

		.then(function(assassins) {
			//console.log('inside post');

			res.redirect('/assassins');
		})
		.catch(function(error) {
			console.log(error);
			res.sendStatus(500);

		});

});

router.get('/:id/update', function (req,res, next) {
	let id = req.params.id;
	let updatedbody = req.body;
	knex('assassins')
		.where({
			id
		})
		.then(function (updatedbody) {
			res.render('assassins_update',updatedbody[0]);
		});
});
router.put('/:id', function(req, res) {
	let id = req.params.id;
	knex('assassins')
		.where({id: id})
		.returning(id)
		.update({
			full_name: req.body.full_name,
			code_names: req.body.code_names,
			weapon: req.body.weapon,
			age: req.body.age,
			price: req.body.price,
			rating: req.body.rating,
			kills: req.body.kills
		}, '*')

		.then(function(updatedbody)  {
			res.redirect('/assassins');
		})
		.catch((error) => {
			console.log(error);
		});
});




router.get('/:id', function(req, res) {
	res.render('assassins_delete', {
		'id': req.body.id
	});
});
router.delete('/:id', function(req, res, next) {
	let assassins;
	// console.log('whadddup',req.body);
	knex('assassins')
		.where('id', parseInt(req.body.id))
		.first()
		.then(function(row) {
			if (!row) {
				return next();
			}
			// console.log('inside delete2');

			assassins = row;
			return knex('assassins')
				.del()
				.where('id', req.body.id);
		})
		.then(function() {
			// console.log('this is the ', assassins);
			// delete assassins.id;
			// res.render(assassins);
			res.redirect('/assassins');

		})
		.catch(function(error) {
			console.error(error);
		});
});











// router.get('/:assassin_id', function(req, res) {
// 	 console.log('here in assassins route2');
// 	let id = req.params.assassin_id;
//
// 	if (Number.isNaN(parseInt(id))) {
// 		res.sendStatus(404);
// 	}
//
// 	knex('assassins').where('id', id).first()
// 		.then(function(assassin) {
// 			res.render(assassin);
// 		})
// 		.catch(function(error) {
// 			res.sendStatus(500);
//
// 		});
// });
// console.log('outside post');


module.exports = router;
