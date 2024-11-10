import { Hono } from 'hono';

import usersService from '@modules/users/users.service';

const router = new Hono();

router.get('/', async (c) => {
	const users = await usersService.list();
	return c.json(users);
});

router.get('/:id', async (c) => {
	const { id } = c.req.param();
	const user = await usersService.getById(id);
	return c.json(user);
});

export default router;
