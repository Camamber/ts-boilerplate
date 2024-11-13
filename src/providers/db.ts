import config from '@config/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(config.db.url);

// @ts-expect-error https://github.com/drizzle-team/drizzle-orm/issues/3134
const db = drizzle(client);

export default db;
