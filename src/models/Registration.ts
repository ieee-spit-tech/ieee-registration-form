import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IRegistration extends Document {
  name: string;
  email: string;
  phone: string;
  branch: string;
  preference1: string;
  preference2: string;
  preference3: string;
  motivation: string;
  skills: string;
  openToOtherCommittee: string;
  eventIdea: string;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema: Schema = new Schema(
  {
    uid: {
      type: String,
      unique: true,
      required: true,
      default: () => uuidv4(),
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      enum: ['CE', 'CSE', 'EXTC']
    },
    preference1: {
      type: String,
      required: [true, 'Preference 1 is required'],
      enum: [
        'Marketing',
        'Creative',
        'Public Relations',
        'Operations',
        'Technical'
      ]
    },
    preference2: {
      type: String,
      required: [true, 'Preference 2 is required'],
      enum: [
        'Marketing',
        'Creative',
        'Public Relations',
        'Operations',
        'Technical'
      ]
    },
    preference3: {
      type: String,
      required: [true, 'Preference 3 is required'],
      enum: [
        'Marketing',
        'Creative',
        'Public Relations',
        'Operations',
        'Technical'
      ]
    },
    motivation: {
      type: String,
      required: [true, 'Motivation is required'],
      trim: true,
      maxlength: [1000, 'Motivation cannot exceed 1000 characters']
    },
    skills: {
      type: String,
      required: [true, 'Skills/Experience is required'],
      trim: true,
      maxlength: [1000, 'Skills description cannot exceed 1000 characters']
    },
    openToOtherCommittee: {
      type: String,
      required: [true, 'This field is required'],
      enum: ['Yes', 'No']
    },
    eventIdea: {
      type: String,
      required: [true, 'Event idea is required'],
      trim: true,
      maxlength: [500, 'Event idea cannot exceed 500 characters']
    },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add indexes for better query performance
RegistrationSchema.index({ email: 1 });
RegistrationSchema.index({ createdAt: -1 });

// Prevent model re-compilation during development
export default mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);