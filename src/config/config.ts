import * as defaultConfig from './';
import * as productionConfig from './production';
import * as stagingConfig from './staging';

type Environment = 'development' | 'production' | 'staging' | 'testing';
type ConfigType = typeof defaultConfig;

const envConfigs: Partial<Record<Environment, Partial<ConfigType>>> = {
	production: productionConfig,
	staging: stagingConfig
};

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

function config() {
	const env = process.env.NODE_ENV as Environment;

	let result = { ...defaultConfig };
	if (envConfigs && env in envConfigs) {
		result = deepMergeWithSpread(result, envConfigs[env]);
	}

	const cnfgKeys = Object.keys(process.env).filter((key) => key.includes('CNFG_'));
	for (const key of cnfgKeys) {
		const value = process.env[key] as string;
		const path = key.slice(4).toLowerCase().split('__');
		const envConfig = path.reverse().reduce((acc, k, i) => ({ [k]: i ? acc : value }), {});
		result = deepMergeWithSpread(result, envConfig);
	}

	return result;
}

export default config();
