import userSchema, { UserDocument } from '../models/schemas/user.schema';

export const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  return await userSchema.findOne({ email }).populate('role').exec();
};

export const findUserById = async (_id: string): Promise<UserDocument | null> => {
  return await userSchema.findById(_id).populate('role').exec();
};

export const createUser = async (body: unknown): Promise<UserDocument> => {
  return (await userSchema.create(body)).populate('role');
};
