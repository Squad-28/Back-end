import { Response, Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const routes = Router();

routes.get('/', (req, res: Response) => {
  res.send(`
    <body style="padding: 0;margin: 0;">
      <div style="display: flex;justify-content: center;align-items: center;width: 100vw;height: 100vh;">
        <a href="/api-docs" style="font-famaily: 'Arial';font-size: 1.5rem;">Acessar a documentação da API Rest com Swagger</a>
      </div>
    </body>`);
});

routes.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default routes;
