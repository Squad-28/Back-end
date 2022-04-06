import { Router } from 'express';

import TestController from './App/controllers/TestController';
import UsersController from './App/controllers/UsersController';

const routes = new Router();

// test route
routes.get('/test', TestController.index);

// app routes
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

export default routes;