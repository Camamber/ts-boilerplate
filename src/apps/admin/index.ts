import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import logger from '@providers/logger';
import config from '@config/config';

async function main() {
	const app = new Hono();
	logger.info('Starting admin api...');

	app.get('/', (c) => {
		return c.json({ app: 'Admin api', version: '1.0.0' });
	});
	await new Promise((resolve) => {
		const serveOptions = {
			fetch: app.fetch,
			port: config.apps.admin.port
		};
		serve(serveOptions, (info) => {
			logger.info('admin api started', { pid: process.pid, port: info.port });
			return resolve(info);
		});
	});
}
export default main();
