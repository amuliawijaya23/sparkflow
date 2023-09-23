import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    email_verified: { type: Boolean, required: true },
    picture: { type: String, required: true },
    sid: { type: String, required: true },
    sub: { type: String, required: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
