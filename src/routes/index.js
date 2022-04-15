import { Router } from 'express';

import UserController from '../controllers/User.controller';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';

const routes = new Router();
const userController = new UserController();

routes.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

routes.get('/users', userController.index);
routes.post('/users', userController.create);
routes.get('/users/:id', userController.findById);

export default routes;
