import db from 'src/providers/db';

export default {
	list: async () => {
		return db.select().from('') ('users').select('*');
	},
	getById: async (id: string) => {
		return db('users').where('id', id).select('*').first();
	}
};
