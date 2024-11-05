import taskSchema from '../models/schemas/task.schema';
import { TaskDocument } from '../models/schemas/task.schema';

export const createTask = async (body: unknown): Promise<TaskDocument> => {
  return await taskSchema.create(body);
};
