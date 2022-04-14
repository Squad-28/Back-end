import { Router } from 'express';

import UserController from '../controllers/User.controller';

const routes = new Router();
const userController = new UserController();

routes.get('/users', userController.index);
routes.post('/users', userController.create);
routes.get('/users/:id', userController.findById);

export default routes;
