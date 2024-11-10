import { Hono } from 'hono';

import usersRoutes from './users.routes';

const router = new Hono();
router.route('/users', usersRoutes);

export default router;
