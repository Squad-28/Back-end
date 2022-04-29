import userRoutes from './UserRoutes';
import swaggerRoutes from './SwaggerRoutes';
import errorMiddleware from './ErrorMiddleware';

type TypeRoutes = {
  userRoutes: any;
  swaggerRoutes: any;
  errorMiddleware: any;
};

export default class Routes {
  private constructor() {}

  public static getRoutes(): TypeRoutes {
    return {
      userRoutes: userRoutes,
      swaggerRoutes: swaggerRoutes,
      errorMiddleware: errorMiddleware
    };
  }
}
