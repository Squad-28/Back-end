import { Router } from 'express';

import TestController from './App/controllers/TestController';

const routes = new Router();

routes.get('/users', TestController.index);

export default routes;