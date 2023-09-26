import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    emailVerified: { type: Boolean, required: true },
    password: { type: String, required: true },
    picture: String,
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
