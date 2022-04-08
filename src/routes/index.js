import { Router } from 'express';
import { testeController } from '../controllers/Test.controller';

const routes = new Router();


routes.get('/teste', testeController.findAll);

export default routes;
