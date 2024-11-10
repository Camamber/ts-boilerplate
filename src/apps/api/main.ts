import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import configs from 'src/config';

async function bootstrap() {
	const app = new Hono();

	await new Promise((resolve) => {
		const serveOptions = {
			fetch: app.fetch,
			port: configs.apps.port
		};
		serve(serveOptions, resolve);
	});
}
bootstrap();
