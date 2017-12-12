// parseFile: function to parse a CSV file.
// fileContents = string of data from file.

function parseFile(fileContents) {
	let fileLines = fileContents.split('\n');
	let valuesLine = fileLines[0];
	let values = valuesLine.split(', ');

	// Iterate over values, lowercase them, and replace a space with an underscore.
	let sanitizedValues = values.map(function(value) {
		let lowercaseValue = value.toLowerCase().replace(/["]/g, '');
		let lowercaseValueSplit = lowercaseValue.split(' ');
		let lowercaseValueJoin = lowercaseValueSplit.join('_');
		return lowercaseValueJoin;
	});

	let entities = [];

	// Loop over all entity lines in file.
	for (let i = 1; i < fileLines.length; i++) {
		let entity = {};

		// Iterate over each line and split data by ', '
		let entityLine = fileLines[i];
		let entityValues = entityLine.split(', ');
		if (!entityValues || entityValues.length < sanitizedValues.length) {
			console.log('Last line');
			continue;
		}
		// Example of assassin in csv: "Alexander Duggan", "The Jackal", "Sniper rifle", "jackal@gmail.com", 31, 45, 7.5, 28

		// Iterate over values, remove double quotes -> " <-
		let cleanedValues = entityValues.map(function(value) {
			return value.replace(/["](.+)["]/g, function(match, p1) {
				return p1;
			});
		});

		// Add properties and values to entity object.
		for (let j = 0; j < sanitizedValues.length; j++) {
			let currentProperty = sanitizedValues[j];
			entity[currentProperty] = cleanedValues[j];
		}

		// Push object to entities array.
		entities.push(entity);
	}
	// return parsed entities from csv file.
	return entities;
}

module.exports = {
	parseFile
};
