import { Router } from 'express';

import UserController from '../controllers/User.controller';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';

const routes = new Router();
const userController = new UserController();

routes.get('/', (req, res) => {
  res.send(`
    <body style="padding: 0;margin: 0;">
      <div style="display: flex;justify-content: center;align-items: center;width: 100vw;height: 100vh;">
        <a href="/api-docs" style="font-famaily: 'Arial';font-size: 1.5rem;">Acessar a documentação da API Rest com Swagger</a>
      </div>
    </body>`);
});

routes.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

routes.get('/users', userController.index);
routes.post('/users', userController.create);
routes.get('/users/:id', userController.findById);

export default routes;
