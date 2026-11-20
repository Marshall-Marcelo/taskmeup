import dotenv from 'dotenv';
import { buildApp } from './app.js';
import { pool } from './configs/db.js';

dotenv.config();

function startServer() {
  try {
    const app = buildApp();
    const port = process.env.PORT;

    const server = app.listen(port, () => {
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
