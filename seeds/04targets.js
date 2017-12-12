let fs = require('fs');

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('targets').del()
		.then(function() {
			// Inserts seed entries
			let data = fs.readFileSync('data/contracts.csv', 'utf8');


			let dataArr = [];
			//console.log('what up?', data);
			let newSplitData = data.split('\n');
			for (let i = 1; i < newSplitData.length; i++) {
				dataArr.push(newSplitData[i].split(', '));
			}
			let emptyArr = [];
			for (var q = 0; q < dataArr.length - 1; q++) {
				//console.log('why??????', dataArr[q][4]);
				emptyArr.push({
					target_name: dataArr[q][0],
					target_location: dataArr[q][1],
					target_photo: dataArr[q][2],
					security_lvl: dataArr[q][3]
				});


			}
			return knex('targets').insert(emptyArr);
		});

};
