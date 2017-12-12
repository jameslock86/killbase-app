

let csvParser = require('../helper_folder/parser_csv.js');
let fs = require('fs');

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('assassins').del()
		.then(function () {
			// Read seed data from csv file and use parser to format everything.
			let assassinsData = fs.readFileSync('./data/assassins.csv', 'utf8');

			let assassins = csvParser.parseFile(assassinsData);

			return knex('assassins').insert(assassins).returning('*');
		});
};




// exports.seed = function(knex, Promise) {
// 	// Deletes ALL existing entries
// 	return knex('assassins').del()
// 		.then(function() {
// 			//console.log('im here');
// 			let data = fs.readFileSync('data/assassins.csv', 'utf8');
//
// 			//console.log('hi', data);
// 			let dataArr = [];
// 			let newSplitData = data.split('\n');
// 			//console.log('this', newSplitData);
// 			for (let i =- 1; i < newSplitData.length; i++) {
// 				dataArr.push(newSplitData[i].split(', '));
// 			}
// 			//console.log('3', dataArr);
// 			// Inserts seed entries
// 			let emptyArr = [];
// 			//console.log(dataArr[0]);
// 			//console.log(dataArr[0][0]);
// 			for (let i = 0; i < dataArr.length -1; i++) {
//
// 				emptyArr.push({
// 					assassins_name: dataArr[i][0],
// 					assassins_code_name: dataArr[i][1],
// 					weapon_of_choice: dataArr[i][2],
// 					contact_info: dataArr[i][3],
// 					age: dataArr[i][4],
// 					price: dataArr[i][5],
// 					rating: dataArr[i][6],
// 					kills: dataArr[i][7]
// 				});
// 			}
//
// 			//console.log(emptyArr);
// 			return knex('assassins').insert(emptyArr);
// 		}
//
//
// 			//1st read csv file
// 			//check to see if error, log err out
// 			//log data, split data by line break,
// 			//loop over array of assassins, first line is the columns then the next is the data.
// 			// split all the lines by the comma space ", "
// 		);
// };
