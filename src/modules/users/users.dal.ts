import { eq } from 'drizzle-orm';

import db from '@providers/db';

import { usersTable } from './users.schema';

export default {
	list: async () => {
		return db.query.usersTable.findMany({ offset: 0 });
	},
	getById: async (id: number) => {
		return db.query.usersTable.findFirst({ where: eq(usersTable.id, id) });
	}
};
