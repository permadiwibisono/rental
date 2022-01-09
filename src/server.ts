/* eslint-disable no-console */
import http, { ServerResponse } from 'http';
import { Socket } from 'net';

interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

const sockets = new Set<Socket>();
const server = http.createServer((_, res: ServerResponse) => {
  res.write(JSON.stringify({ message: 'Hello world', statusCode: 200 }));
  res.end();
});

const port = process.env.PORT || 5000;

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
server.on('connection', (socket) => {
  sockets.add(socket);

  server.once('close', () => {
    sockets.delete(socket);
  });
});
server.listen(port);
server.on('listening', onListening);
server.on('error', onError);

process.on('SIGTERM', handleShutdown).on('SIGINT', handleShutdown).on('uncaughtException', handleShutdown);

process.on('exit', (code) => {
  console.log(`Server is going to exit with code: ${code}`);
});
