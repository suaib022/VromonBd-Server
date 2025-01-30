import { Router } from 'express';
import { UserRoute } from '../Modules/User/User.Route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
