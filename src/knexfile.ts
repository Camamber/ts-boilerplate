import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'root',
			password: 'root'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'migrations'
		}
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'root',
			password: 'root'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'migrations'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'root',
			password: 'root'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'migrations'
		}
	}
};

module.exports = config;
