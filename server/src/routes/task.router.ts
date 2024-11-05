import { Router } from 'express';
import { addTask } from '../controllers/task.controller';

export const taskRouter = Router();

taskRouter.post("/", addTask)


