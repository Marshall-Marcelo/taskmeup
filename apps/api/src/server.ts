import dotenv from 'dotenv';
import { buildApp } from './app.js';
import { pool } from './configs/db.js';
import { createServer } from 'node:http';
import { initializeSocket } from './sockets/socket.js';

dotenv.config();

function startServer() {
  try {
    const app = buildApp();
    const httpServer = createServer(app);
    initializeSocket(httpServer);

    const port = process.env.PORT;

    const server = httpServer.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });

    process.on('SIGTERM', () => {
      console.log('Signal Received: Closing HTTP Server');
      server.close(async () => {
        await pool.end();
        console.log('Server closed');
      });
    });
  } catch (error) {
    console.error('Error occurred', error);
    process.exit(1);
  }
}

startServer();
