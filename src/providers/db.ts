import knex from 'knex';
import config from 'src/config';

export default knex({
	client: 'pg',
	connection: config.apps.port,
	searchPath: ['knex', 'public']
});
