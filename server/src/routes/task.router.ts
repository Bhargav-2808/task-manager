import { Router } from 'express';
import { addTask, updateTask, deleteTask } from '../controllers/task.controller';

export const taskRouter = Router();

taskRouter.post("/", addTask)
taskRouter.put("/:id", updateTask)
taskRouter.delete("/:id", deleteTask)


