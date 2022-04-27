import 'reflect-metadata';
import 'dotenv/config';

import App from './app';
import { DatabaseSingleton } from './database';

async function initServer(): Promise<void> {
  const PORT = process.env.PORT || 3333;
  const NODE_ENV = process.env.NODE_ENV;

  App.getInstance().listen(PORT, () => {
    if (NODE_ENV !== 'production') {
      console.log(`🚀 Server started at http://localhost:${PORT}`);
    }
  });
}

DatabaseSingleton.connect()
  .then(async () => {
    await initServer();
  })
  .catch((error) => {
    console.error(error);
  });
