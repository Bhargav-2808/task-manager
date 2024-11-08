import { UpdateQuery } from 'mongoose';
import taskSchema from '../models/schemas/task.schema';
import { TaskDocument } from '../models/schemas/task.schema';
import userSchema, { UserDocument } from '../models/schemas/user.schema';

export const createTask = async (body: unknown): Promise<TaskDocument> => {
  return await taskSchema.create(body);
};

export const updateTaskService = async (body: UpdateQuery<TaskDocument>, id: string): Promise<TaskDocument | null> => {
  return await taskSchema.findOneAndUpdate({ _id: id }, body, { new: true });
};

export const deleteTaskService = async (id: string): Promise<void> => {
  await taskSchema.deleteOne({ _id: id });
};

export const getTasks = async (id: string): Promise<UserDocument | null> => {
  return await userSchema
    .findOne({
      _id: id,
    })
    .populate('tasks')
    .exec();
};
