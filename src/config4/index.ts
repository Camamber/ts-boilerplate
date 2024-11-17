import 'reflect-metadata';
import { z } from 'zod';
import { config } from 'dotenv';
import appsConfig from './apps';
import databaseConfig from './db';

enum Environment {
	development = 'development',
	production = 'production',
	staging = 'staging',
	testing = 'testing'
}

const configValidation = z.object({
	NODE_ENV: z.nativeEnum(Environment).default(Environment.development),
	APPS: appsConfig,
	DB: databaseConfig
});

function deepMergeWithSpread(obj1: any, obj2: any) {
	const result = { ...obj1 };

	for (const key in obj2) {
		if (obj2.hasOwnProperty(key)) {
			if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
				result[key] = deepMergeWithSpread(obj1[key], obj2[key]);
			} else {
				result[key] = obj2[key];
			}
		}
	}

	return result;
}

function validate(config: Record<string, unknown>) {
	const nestedConfig = Object.entries(config).reduce(
		(acc, [key, value]) =>
			deepMergeWithSpread(
				acc,
				key
					.split('__')
					.reverse()
					.reduce((acc, k, i) => ({ [k]: i ? acc : value }), {})
			),
		{}
	);

	return configValidation.parse(nestedConfig);
}

const env = process.env.NODE_ENV || 'development';
config({ path: ['.env.base', `.env.${env}`] });
export default validate(process.env);
