import App from './app';
import Database from './database';
import 'dotenv/config';

async function init() {
  const database = new Database();
  const app = new App(database);

  const PORT = process.env.PORT || 3333;
  const NODE_ENV = process.env.NODE_ENV;

  app.getServer().listen(PORT);

  if (NODE_ENV !== 'production') {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
  }
}

(async () => {
  try {
    await init();
  } catch (error) {
    await database.close();
    console.error(error);
  }
})();
