import { Router } from 'express';

import UserController from '../controllers/User.controller';

const routes = new Router();
const userController = new UserController();

routes.get('/users', userController.index);
routes.post('/users', userController.create);

export default routes;
