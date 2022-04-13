import { Router } from 'express';

import UserController from '../controllers/User.controller';

const routes = new Router();
const userController = new UserController();

// app routes
routes.get('/users', userController.index);
// routes.get('/users/:id', userController.show);
routes.post('/users', userController.create);
// routes.put('/users/:id', userController.update);

export default routes;
