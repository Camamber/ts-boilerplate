import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import config from '@config/config';
import { userSchema } from '@modules/users';

const client = postgres(config.db.url);

const schema = { ...userSchema };
const db = drizzle({ client, schema });
export default db;
