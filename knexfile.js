// Update with your config settings.

module.exports = {

	development: {
		client: 'pg',
		connection: {
			host: '127.0.0.1',
			database: 'kill_base2.0',
			user:'jameslock86',
			password:''
		},
		migrations:{
			tableName:
			'knex_migrations',
			directory: './migrations'
		}
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user:     'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user:     'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}

};
