exports.up = function(knex, Promise) {



	return knex.schema.createTableIfNotExists('assassins', function(table) {
		// id, name, code-name,weapon,contact-info,age,price,rating,kills

		table.increments();
		table.string('assassins_name').defaultTo('null');
		table.string('assassins_code_name');
		table.string('weapon_of_choice');
		table.string('contact_info');
		table.integer('age');
		table.integer('price').defaultTo(0);
		table.float('rating', 2, 2).defaultTo(0);
		table.integer('kills').defaultTo(0);
	})
		.then(function() {
			return knex.schema.createTableIfNotExists('targets', function(table) {
				table.increments();
				table.string('target_name').notNullable();
				table.string('target_location').notNullable();
				table.string('target_photo').notNullable();
				table.integer('security_lvl').notNullable();
			});
		})
		// fix the name below on contracts
		//add a price point to the contracts
		.then(function() {
			return knex.schema.createTableIfNotExists('cotracts', function(table) {
				table.increments();
				//table.integer('client_id').references('clients.id')onDelete('CASCADE') target and completed_by
				table.string('client_id').defaultTo(null);
				//table.integer('target_id').references('target.id')onDelete('CASCADE')
				table.string('target_id').notNullable();
				table.integer('budget').notNullable();
				// defualt to true or fase boolean
				table.boolean('completetion').defaultTo('active');
				//table.integer('completed_by').references('assassins.id')onDelete('CASCADE')
				table.string('completed_by').defaultTo('no_one');

			});
		})
		.then(function() {
			return knex.schema.createTableIfNotExists('clients', function(table) {
				table.increments();
				table.string('name');
				// budget

			});

		});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('assassins')
		.then(function() {
			return knex.schema.dropTableIfExists('targets').then(function() {
				return knex.schema.dropTableIfExists('cotracts').then(function() {
					return knex.schema.dropTableIfExists('clients');

				});
			});

		});
};
