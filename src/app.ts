import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/Routes';
import globalErrorHandler from './app/Middlewares/globalErrorHandler';
const app: Application = express();
// const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello VromonBashi !!!');
});

app.use(globalErrorHandler);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

export default app;
