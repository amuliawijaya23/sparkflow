import mongoose, { Schema } from 'mongoose';

const boardScheme = new Schema(
  {
    name: { type: String, required: true, index: { unique: true } },
    team: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    logo: String,
  },
  {
    timestamps: true,
  },
);

const Board = mongoose.models.Board || mongoose.model('Board', boardScheme);
export default Board;
