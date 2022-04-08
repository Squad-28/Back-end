import { Router } from 'express';


const routes = new Router();

// test route
routes.get('/test', TestController.index);

// app routes
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);

export default routes;
