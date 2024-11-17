import { z } from 'zod';
import usersDal from './users.dal';

const service = {
	list: usersDal.list,
	getById: (id: any) => usersDal.getById(z.coerce.number().parse(id))
};

export default service;
