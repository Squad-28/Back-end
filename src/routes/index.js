import { Router } from 'express';

import TestController from '../controllers/Test.controller';
import UsersController from '../controllers/Users.controller';

const routes = new Router();
const usersController = new UsersController();

// test route
routes.get('/test', TestController.findAll);

// app routes
// routes.get('/users', usersController.index);
// routes.get('/users/:id', usersController.show);
routes.post('/users', usersController.create);
// routes.put('/users/:id', usersController.update);

export default routes;
