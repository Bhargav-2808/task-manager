import { Response } from 'express';
import { AuthenticatedRequest } from '../types/request';
import { asyncMW } from '../utils/asyncMW';
import { addTaskSchema, updateTaskSchema } from '../validation/task.validation';
import ResponseHandler from '../utils/responseHandler';
import { createTask, deleteTaskService, updateTaskService } from '../services/task.service';
import { TASK_STATUS } from '../utils/constants/constant';
import { user } from '../types/common';
import { updateUserData } from '../services/auth.service';

export const addTask = asyncMW(async (req: AuthenticatedRequest, res: Response) => {
  const validatedInput = addTaskSchema.safeParse(req.body);

  const user = req.userData as user;

  if (!validatedInput.success) {
    return ResponseHandler.badRequest(res, validatedInput.error.format(), 'Invalid body parameters');
  }

  const task = await createTask({
    ...validatedInput.data,
    status: TASK_STATUS.TODO,
  });


  const userData = await updateUserData(
    {
      $push: { tasks: task._id },
    },
    user._id,
  );


  return ResponseHandler.created(res, userData, 'Tasks added successfully !!');
});

export const updateTask = asyncMW(async (req: AuthenticatedRequest, res: Response) => {
  const validatedInput = updateTaskSchema.safeParse(req.body);

  const taskId = req.params.id as string;

  if(!taskId) {
    return ResponseHandler.badRequest(res, 'Task ID is required', 'Invalid task ID');
  }

  if (!validatedInput.success) {
    return ResponseHandler.badRequest(res, validatedInput.error.format(), 'Invalid body parameters');
  }

  const task = await updateTaskService({
    ...validatedInput.data,
  },taskId);



  return ResponseHandler.created(res, task, 'Tasks added successfully !!');
});


export const deleteTask = asyncMW(async (req: AuthenticatedRequest, res: Response) => {

  const taskId = req.params.id as string;

  if(!taskId) {
    return ResponseHandler.badRequest(res, 'Task ID is required', 'Invalid task ID');
  }

  await deleteTaskService(taskId);

  return ResponseHandler.created(res, taskId, 'Tasks added successfully !!');
});