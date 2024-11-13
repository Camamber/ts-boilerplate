import { createLogger, transports, format } from 'winston';
import { DateTime } from 'luxon';
import config from '@config/config';

const meta = format((info) =>
	Object.assign(info, {
		timestamp: DateTime.local().toISO(),
		app: process.env.name || 'default application',
		env: config.env
	})
);

const filterPrivate = format((info) => {
	if (info.requestBody) {
		const requestBody = info.requestBody as string;
		info.requestBody = requestBody.replace(/"password":".*?"/g, '"password": "<filtered>"');
	}
	return info;
});

const formats = {
	json: [filterPrivate(), format.json()],
	simple: [filterPrivate(), format.colorize(), format.simple()]
};

const transportConfig = { level: config.env === 'testing' ? 'warn' : 'silly', handleExceptions: false };

const logger = createLogger({
	format: format.combine(meta(), ...formats[config.env === 'development' ? 'simple' : 'json']),
	transports: [new transports.Console(transportConfig)],
	exitOnError: false
});

export default logger;
