import { Response } from 'express';
import { AuthenticatedRequest } from '../types/request';
import { asyncMW } from '../utils/asyncMW';
import { addTaskSchema } from '../validation/task.validation';
import ResponseHandler from '../utils/responseHandler';
import { createTask } from '../services/task.service';
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
