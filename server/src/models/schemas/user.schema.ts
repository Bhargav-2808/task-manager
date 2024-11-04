import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the document interface
export type UserDocument = Document & {
  first_name: string;
  last_name: string;
  profile_photo: string;
  email: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  password: string;
  address: string;
};

export type UserModel = Model<UserDocument>;

const UserSchema = new Schema<UserDocument>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  profile_photo: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the model
export default mongoose.model<UserDocument, UserModel>('User', UserSchema);
