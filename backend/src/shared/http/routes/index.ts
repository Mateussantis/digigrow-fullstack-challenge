import { taskRouter } from '@/domain/tasks/http/routes/task.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/task', taskRouter);

export { routes };