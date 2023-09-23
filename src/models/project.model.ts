import { Timestamp } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    dueDate: { type: Timestamp, required: true },
    assignee: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
