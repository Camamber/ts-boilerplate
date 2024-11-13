import 'reflect-metadata';
import { plainToInstance, Type } from 'class-transformer';
import { IsDefined, IsEnum, ValidateNested, validateSync } from 'class-validator';
import { config } from 'dotenv';
import AppsConfig from './apps';
import DatabaseConfig from './db';

enum Environment {
	development = 'development',
	production = 'production',
	staging = 'staging',
	testing = 'testing'
}

class Config {
	@IsEnum(Environment)
	NODE_ENV: Environment = Environment.development;

	@IsDefined()
	@ValidateNested()
	@Type(() => AppsConfig)
	APPS: AppsConfig;

	@IsDefined()
	@ValidateNested()
	@Type(() => DatabaseConfig)
	DB: DatabaseConfig;
}

function deepMergeWithSpread(obj1, obj2) {
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
	const validatedConfig = plainToInstance(Config, nestedConfig, { enableImplicitConversion: true });
	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}

const env = process.env.NODE_ENV || 'development';
config({ path: ['.env.base', `.env.${env}`] });
export default validate(process.env);
