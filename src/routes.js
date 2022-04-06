import { Router } from 'express';

import TestController from './App/controllers/TestController';
import UsersController from './App/controllers/UsersController';

const routes = new Router();

// test route
routes.get('/test', TestController.index);

// app routes
routes.get('/users', UsersController.index)

export default routes;