import { Router } from 'express';
import { create, findAll, findById } from '../controllers/UserController';

const routes = Router();

routes.get('/users', findAll);
routes.post('/users', create);
routes.get('/users/:id', findById);

export default routes;
