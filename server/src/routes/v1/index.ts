import express, { Router } from 'express';
import docsRouter from './docs.route';
import pageItemsRouter from './pageItems.route';
import usersRouter from './users.route';
import workspacesRouter from './workspaces.route';
import authRouter from './auth.route';

export type RouteDef = {
  path: string;
  router: Router;
};

const router = express.Router();

const defaultRoutes: RouteDef[] = [
  {
    path: '/pageItems',
    router: pageItemsRouter,
  },
  {
    path: '/users',
    router: usersRouter,
  },
  {
    path: '/workspaces',
    router: workspacesRouter,
  },
  {
    path: '/auth',
    router: authRouter,
  },
];

const devRoutes: RouteDef[] = [
  {
    path: '/docs',
    router: docsRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

if (process.env.NODE_ENV === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.router);
  });
}

export default router;
