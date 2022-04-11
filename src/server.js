import App from './app';
import Database from './database';

const database = new Database();
const app = new App(database);

(async () => {
  try {
    app
      .getServer()
      .listen(3333, () =>
        console.log('🚀 Server started at http://localhost:3333')
      );
  } catch (error) {
    await database.close();
    console.error(error);
  }
})();
