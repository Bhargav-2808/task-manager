import { Router } from 'express';
import { addTask, updateTask, deleteTask, getUserTasks } from '../controllers/task.controller';

export const taskRouter = Router();

taskRouter.get("/", getUserTasks)
taskRouter.post("/", addTask)
taskRouter.put("/:id", updateTask)
taskRouter.delete("/:id", deleteTask)


