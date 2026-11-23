import { Server } from 'socket.io';
import type { Server as HttpServer } from 'node:http';
import { env } from './env.js';

let io: Server;

export function initializeSocket(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error('Socket.IO has not been initialized');
  }

  return io;
}
