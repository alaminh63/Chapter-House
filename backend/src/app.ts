import express, { Application, Request, Response } from 'express';

import cors from 'cors';

import router from './routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// CORS
//SHOULD HAVE TO CHANGE THE ORIGIN WHEN PRODUCTION!
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

// 3rd PARTY MIDDLEWARE


// BODY PARSER
app.use(express.json());

// ROUTER
app.use('/api/v1', router);

// HELLO RESPONSE
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World! 👋' });
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

// NOT FOUND
app.use(notFound);
export default app;
