import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumberString, IsString, validateSync } from 'class-validator';
import { config } from 'dotenv';

// type Environment = 'development' | 'production' | 'staging' | 'testing';

enum Environment {
	development = 'development',
	production = 'production',
	staging = 'staging',
	testing = 'testing'
}

class Config {
	@IsEnum(Environment)
	NODE_ENV: Environment = Environment.development;

	@IsNotEmpty()
	@IsString()
	DB__URL: string;

	@IsNotEmpty()
	@IsNumberString()
	APPS__API__PORT: number;

	@IsNotEmpty()
	@IsNumberString()
	APPS__ADMIN__PORT: number;
}

function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(Config, config, { enableImplicitConversion: true });
	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}

const env = process.env.NODE_ENV || 'development';
config({ path: ['.env.base', `.env.${env}`] });
export default validate(process.env);
