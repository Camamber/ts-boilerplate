import { z } from 'zod';

const appConfig = z.object({
	PORT: z.coerce.number()
});

export default z.object({
	ADMIN: appConfig,
	API: appConfig
});
