import App from './app';
import Database from './database';

const app = new App(new Database());

app
  .getServer()
  .listen(3333, () =>
    console.log('🚀 Server started at http://localhost:3333')
  );
