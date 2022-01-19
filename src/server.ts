/* eslint-disable no-console */
import http from 'http';
import { Socket } from 'net';

import App from './app';

interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

const port = process.env.PORT || 4000;
const sockets = new Set<Socket>();
const app = new App();
const server = http.createServer(app.server);

function onError(error: ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  /* eslint-disable no-fallthrough */
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  console.log('Running on port:', port);
}

function handleShutdown(signal: string) {
  const exitCode = signal === 'uncaughtException' ? 1 : 0;
  console.log(`Server stop running.. Receiving Signal: ${signal}`);
  // eslint-disable-next-line no-restricted-syntax
  for (const socket of sockets) {
    socket.destroy();
    sockets.delete(socket);
  }
  server.close(() => {
    process.exit(exitCode);
  });
}

process.on('SIGTERM', handleShutdown).on('SIGINT', handleShutdown).on('uncaughtException', handleShutdown);

process.on('exit', (code) => {
  console.log(`Server is going to exit with code: ${code}`);
});

(() => {
  try {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
    server.on('connection', async (socket) => {
      await app.init();
      sockets.add(socket);

      server.once('close', () => {
        sockets.delete(socket);
      });
    });
  } catch (e) {
    console.error('server error: ', e);
    process.exit(1);
  }
})();

export default server;
