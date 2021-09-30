import express, { Router } from 'express';
import docsRouter from './docs.route';

interface RouteDef {
  path: string;
  router: Router;
}

const router = express.Router();

const defaultRoutes: RouteDef[] = [];

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
