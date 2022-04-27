import 'reflect-metadata';
import 'dotenv/config';

import App from './app';
import { DatabaseSingleton } from './database';
import { Server as ServerHttps } from 'https';
import { Server as ServerHttp } from 'http';

let server: ServerHttps | ServerHttp;

async function initServer(): Promise<void> {
  const PORT = process.env.PORT || 3333;
  const NODE_ENV = process.env.NODE_ENV;

  const app = App.getInstance();

  server = app.listen(PORT, () => {
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

enum ExitStatus {
  Failure = 1,
  Success = 0
}

//nao permite que o erro quebre o sistema
process.on('uncaughtException', (error, origin) => {
  console.log('Error', error);
  console.log('Origin', origin);
  process.exit(ExitStatus.Failure);
});

//nao permite que o sistema jogue um warn pro erro
process.on('unhandledRejection', (reason, promise) => {
  console.log(`Unhandled promise: ${promise}. Reason: ${reason}`);
  throw reason;
});

//graceful shutdown
function gracefulShutdown(event: NodeJS.Signals) {
  return (code: any) => {
    console.log(`${event} received.`);
    console.log('Closing server...');
    server.close((error) => {
      console.log('Server closed.');
      console.log('Closing database...');
      DatabaseSingleton.close();
      console.log('Database closed.');
      if (error) {
        process.exit(ExitStatus.Failure);
      }
      process.exit(ExitStatus.Success);
    });
  };
}

//disparado no ctrl+c (terminal multiplataforma)
process.on('SIGINT', gracefulShutdown('SIGINT'));

//disparado no comando kill (terminal linux)
process.on('SIGTERM', gracefulShutdown('SIGTERM'));

process.on('exit', (code) => {
  console.log(`Exiting with ${code}...`);
  process.exit(code);
});
