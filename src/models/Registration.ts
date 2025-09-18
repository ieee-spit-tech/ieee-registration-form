import mongoose, { Document, Schema } from 'mongoose';

export interface IRegistration extends Document {
  name: string;
  email: string;
  phone: string;
  uid: string;
  branch: string;
  year: string;
  preference1: string;
  preference2: string;
  preference3: string;
  motivation: string;
  skills: string;
  openToOtherCommittee: string;
  resume?: {
    filename: string;
    contentType: string;
    data: string; // base64 encoded file data
    size: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema: Schema = new Schema(
  {
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
    uid: {
      type: String,
      required: [true, 'UID (Roll number) is required'],
      length: [10, 'UID must be exactly 10 characters'],
      unique: true,
      trim: true
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      enum: ['CE', 'CSE', 'EXTC']
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
      enum: ['FE', 'SE', 'TE']
    },
    preference1: {
      type: String,
      required: [true, 'Preference 1 is required'],
      enum: [
        'Marketing Head',
        'Event Head',
        'Creative head',
        'Head Of Subcomm',
        'Deputy Tech Head',
        'Head of Public Relations',
        'Head of Operations',
        'Social Media Manager'
      ]
    },
    preference2: {
      type: String,
      required: [true, 'Preference 2 is required'],
      enum: [
        'Marketing Head',
        'Event Head',
        'Creative head',
        'Head Of Subcomm',
        'Deputy Tech Head',
        'Head of Public Relations',
        'Head of Operations',
        'Social Media Manager'
      ]
    },
    preference3: {
      type: String,
      required: [true, 'Preference 3 is required'],
      enum: [
        'Marketing Head',
        'Event Head',
        'Creative head',
        'Head Of Subcomm',
        'Deputy Tech Head',
        'Head of Public Relations',
        'Head of Operations',
        'Social Media Manager'
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
    resume: {
      filename: {
        type: String,
        default: null
      },
      contentType: {
        type: String,
        default: null
      },
      data: {
        type: String, // base64 encoded file
        default: null
      },
      size: {
        type: Number,
        default: null
      }
    }
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add indexes for better query performance
RegistrationSchema.index({ email: 1 });
RegistrationSchema.index({ uid: 1 });
RegistrationSchema.index({ createdAt: -1 });

// Virtual to get resume size in human readable format
RegistrationSchema.virtual('resumeSizeFormatted').get(function(this: IRegistration) {
  if (!this.resume?.size) return null;
  const bytes = this.resume.size;
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
});

// Prevent model re-compilation during development
export default mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);