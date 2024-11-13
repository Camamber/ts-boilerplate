import { IsNotEmpty, IsString } from 'class-validator';

export default class DatabaseConfig {
	@IsNotEmpty()
	@IsString()
	URL: string;
}
