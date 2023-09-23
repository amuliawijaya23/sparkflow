import mongoose, { Schema } from 'mongoose';

const organizationSchema = new Schema(
  {
    id: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Organization =
  mongoose.models.Organization ||
  mongoose.model('Organization', organizationSchema);
export default Organization;
