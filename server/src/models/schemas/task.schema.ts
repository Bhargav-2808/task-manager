import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the document interface
export type TaskDocument = Document & {
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  created_at: Date;
  updated_at: Date;
};

export type TaskModel = Model<TaskDocument>;

const TaskSchema = new Schema<TaskDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'in_progress', 'completed'], 
    required: true, 
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});


TaskSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model<TaskDocument, TaskModel>('Task', TaskSchema);
