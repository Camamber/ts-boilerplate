import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumberString, ValidateNested } from 'class-validator';

class AppConfig {
	@IsNotEmpty()
	@IsNumberString()
	PORT!: number;
}

export default class AppsConfig {
	@IsDefined()
	@ValidateNested()
	@Type(() => AppConfig)
	ADMIN!: AppConfig;

	@IsDefined()
	@ValidateNested()
	@Type(() => AppConfig)
	API!: AppConfig;
}
