import { z } from 'zod';

export const addTaskSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'title must be in String.',
      required_error: 'title is required',
    })
    .trim(),
  description: z
    .string({
      invalid_type_error: 'description must be in String.',
      required_error: 'description is required',
    })
    .trim(),
});


