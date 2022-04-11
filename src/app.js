import express from 'express';
import cors from 'cors';
import routes from './routes';

class App {
  #server;

  constructor(database) {
    this.#startDatabase(database);
    this.#server = express();
    this.#middlewares();
    this.#routes();
  }

  #middlewares() {
    this.#server.use(express.json());
    this.#server.use(cors());
  }

  #routes() {
    this.#server.use(routes);
  }

  getServer() {
    return this.#server;
  }

  async #startDatabase(database) {
    await database.start();
  }
}

export default App;
