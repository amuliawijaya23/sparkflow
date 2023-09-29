import mongoose, { Schema } from 'mongoose';

const boardScheme = new Schema(
  {
    name: { type: String, required: true, index: { unique: true } },
    team: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Board = mongoose.models.Board || mongoose.model('Board', boardScheme);
export default Board;
