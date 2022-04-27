import express, { Express } from 'express';
import cors from 'cors';
import Routes from './routes';

class App {
  private static expressInstance: Express;

  private constructor() {}

  private static setInstance(): void {
    App.expressInstance = express();
    this.middlewares();
    this.routes();
  }

  private static middlewares(): void {
    App.expressInstance.use(express.json());
    App.expressInstance.use(cors());
  }

  private static routes(): void {
    const routes = Routes.getRoutes();
    App.expressInstance.use(routes.swaggerRoutes, routes.userRoutes);
    App.expressInstance.use(routes.errorMiddleware);
  }

  public static getInstance(): Express {
    if (!App.expressInstance) {
      this.setInstance();
    }
    return App.expressInstance;
  }
}

export default App;
