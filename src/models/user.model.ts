import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, required: true, index: { unique: true } },
    emailVerified: { type: Boolean, required: true },
    password: { type: String, required: true },
    picture: String,
    dateOfBirth: Date,
    linkedIn: String,
    instagram: String,
    twitter: String,
    github: String,
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
