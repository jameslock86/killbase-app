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
			res.render('assassins', {assassins});
		})
		.catch(function(error) {
			res.sendStatus(500);
		});
});

// works to get my post section
router.get('/assassins_post', function(req,res){
 	res.render('assassins_post');
});

router.get('/assassins_post', function(req, res) {
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
			console.log('inside post');

			res.render('assassins_post', {'assassins': assassins[0]});
		})
		.catch(function(error) {
			console.log(error);
			res.sendStatus(500);

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


// router.patch('/:id', function(req, res, next) {
// 	knex('assassins')
// 		.where('id', req.params.id)
// 		.first()
// 		.then(function(assassins) {
// 			if (!assassins) {
// 				return next();
// 			}

// 			return knex('assassins')
// 				.update({
// 					full_name: req.body.full_name,
// 					code_names: req.body.code_names,
// 					weapon: req.body.weapon,
// 					age: req.body.age,
// 					price: req.body.price,
// 					rating: req.body.rating,
// 					kills: req.body.kills
// 				}, '*')
// 				.where('id', req.params.id);
// 		})
// 		.then((assassins) => {
// 			res.send(assassins[0]);
// 		})
// 		.catch((err) => {
// 			next(err);
//
// 		});
// });
// router.delete('/:id',function (req,res,next) {
// 	let assassins;
// 	knex('assassins')
// 		.where('id',req.params.id)
// 		.first()
// 		.then(function (row) {
// 			if (!row){
// 				return next();
// 			}
// 			assassins = row;
// 			return knex('assassins')
// 				.del()
// 				.where('id',req.params.id);
// 		})
// 		.then(function () {
// 			delete assassins.id;
// 			res.send(assassins);
// 		})
// 		.catch(function (err) {
// 			next(err);
// 		});
// });
module.exports = router;
