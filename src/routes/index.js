import { Router } from 'express';

import TestController from '../controllers/Test.controller';
import UsersController from '../controllers/Users.controller';

const routes = new Router();

// test route
routes.get('/test', TestController.findAll);

// app routes
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);

export default routes;
