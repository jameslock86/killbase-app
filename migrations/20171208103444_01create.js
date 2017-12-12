exports.up = function(knex, Promise) {



	return knex.schema.createTableIfNotExists('assassins', function(table) {
		// id, name, code-name,weapon,contact-info,age,price,rating,kills

		table.increments();
		table.string('full_name').defaultTo('null');
		table.string('code_names');
		table.string('weapon');
		table.string('contact_info');
		table.integer('age');
		table.integer('price').defaultTo(0);
		table.float('rating', 2, 2).defaultTo(0);
		table.integer('kills').defaultTo(0);
	})
		.then(function() {
			return knex.schema.createTableIfNotExists('targets', function(table) {
				table.increments();
				table.string('location').notNullable();
				table.integer('security_level').notNullable();
				table.string('target_name').notNullable();
				table.string('target_photo').notNullable();
			});
		})
	// fix the name below on contracts
	//add a price point to the contracts


		.then(function() {
			return knex.schema.createTableIfNotExists('clients', function(table) {
				table.increments();
				table.integer('budget').notNullable();
				table.string('client_name');

			});

		})
		.then(function() {
			return knex.schema.createTableIfNotExists('contracts', function(table) {
				table.increments();

				table.integer('target_id').references('targets.id').onDelete('CASCADE');

				table.integer('client_id').references('clients.id').onDelete('CASCADE');

				table.integer('price').notNullable();
				table.boolean('completed').defaultTo('false');
				table.integer('completed_by').references('assassins.id').onDelete('CASCADE');

			});
		});

};

exports.down = function(knex, Promise) {

	return knex.schema.dropTableIfExists('cotracts')
		.then(function() {
			return knex.schema.dropTableIfExists('targets')
				.then(function() {
					return knex.schema.dropTableIfExists('clients').then(function() {
						return knex.schema.dropTableIfExists('assassins');

					});
				});

		});
};
