let fs = require('fs');

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('clients').del()
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
				 name: dataArr[q][4]
				});


			}
			return knex('clients').insert(emptyArr);
		});
};
