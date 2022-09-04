import { errorMiddleware } from '@middleware/errorMiddleware';
import express, { json } from 'express';
import helmet from 'helmet';
import container from '@di/index';
import MainRouter from './presentation/routes';
import { tokens } from '@di/tokens';

const mainRouter = container.resolve<MainRouter>(tokens.MainRouter);

const app = express();
app.use(helmet());
app.use(json());
app.use(mainRouter.setup());
app.use(errorMiddleware);

export default app;
