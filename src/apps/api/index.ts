import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import routes from './routes';
import logger from '@providers/logger';
import config from '@config/config';

async function main() {
	const app = new Hono();
	logger.info('Starting api...');

	app.get('/', (c) => {
		return c.json({ app: 'api', version: '1.0.0' });
	});
	app.route('/v1', routes);

	await new Promise((resolve) => {
		const serveOptions = {
			fetch: app.fetch,
			port: config.apps.api.port
		};
		serve(serveOptions, (info) => {
			logger.info('api started', { pid: process.pid, port: info.port });
			return resolve(info);
		});
	});
}
export default main();
