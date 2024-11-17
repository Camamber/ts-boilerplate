import db from '@providers/db';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

async function runMigration() {
	console.log('Migration started ⌛');

	try {
		await migrate(db, { migrationsFolder: '../src/migrations' });
		console.log('Migration completed ✅');
	} catch (error) {
		console.error('Migration failed 🚨:', error);
	} finally {
		await db.$client.end();
	}
}

runMigration().catch((error) => console.error('Error in migration process 🚨:', error));
