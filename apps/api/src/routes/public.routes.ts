import mount from 'koa-mount';

import { AppKoa, AppRouter } from 'types';
import { accountRoutes } from 'resources/account';
import {photoRoutes} from "resources/photo";

const healthCheckRouter = new AppRouter();
healthCheckRouter.get('/health', ctx => ctx.status = 200);

export default (app: AppKoa) => {
  app.use(healthCheckRouter.routes());
  app.use(mount('/account', accountRoutes.publicRoutes));
  app.use(mount('/photo', photoRoutes.publicRoutes));
};
