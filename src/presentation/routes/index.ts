import { Router } from 'express';
import container from '@di/index';
import UserRouter from './UserRouter';
import DocsRouter from '@presentation/http/DocsRouter';

const router = Router();
const userRouter = container.resolve(UserRouter);
const docsRouter = container.resolve(DocsRouter);
router.use('/customer', userRouter.setup());
router.use('/docs', docsRouter.setup());
export default router;
