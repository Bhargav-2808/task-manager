import express, { Application, Request, Response } from 'express';
import { config } from './config/config';
import './config/connection/connection';
import './config/connection/seed';
import cors from 'cors';
import { createServer } from 'http';
import { exceptionHandling } from './middleware/exceptionHandling';

export const app: Application = express();

const port = config.app.port || 8080;

const corsOptions = {
  origin: '*',
};

app.use(express.json({ limit: '2gb' }));
app.use(express.static('public'));
app.use(cors(corsOptions));

const httpServer = createServer(app);

// Correctly define the route handler
app.get('/health', (req: Request, res: Response): Response => {
  return res.status(200).json({ code: 200, message: 'Server is running successfully 🚀' });
});

app.use(exceptionHandling);

httpServer.listen(port, () => {
  console.log(`🚀 SERVER AT http://localhost:${port}`);
});