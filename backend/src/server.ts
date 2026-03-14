import dotenv from 'dotenv';
import http from 'http';
import app from './app';

// Load environment variables before anything else
dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

// EOF
