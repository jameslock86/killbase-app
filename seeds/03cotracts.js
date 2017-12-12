let fs = require('fs');
exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('cotracts').del()
		.then(function() {
			// Inserts seed entries

			let data = fs.readFileSync('data/contracts.csv', 'utf8');
			//console.log('james');
			let dataArr = [];
			//console.log('what up?', data);
			let newSplitData = data.split('\n');
			for (let i = 1; i < newSplitData.length; i++) {
				dataArr.push(newSplitData[i].split(', '));
			}
			//console.log('john');
			//let emptyArr = [];
			for (var q = 0; q < dataArr.length - 1; q++) {
				console.log('why??????', dataArr[q][5]);
			}
			//console.log('lockwood');
			//select on names for ids
			return knex('cotracts').insert({
				client_id: knex.select('clients').returning('name')
					.whereIn({}),




				target_id: knex('cotracts').returning('name').where({
					target_id: 'targets[1]'
				}).select('target_id'),
				budget: data[q][5],
				completetion: data[q][6],
				completed_by: data[q][7]
			});
		});
};
client_id;
