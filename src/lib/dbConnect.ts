import mongoose from 'mongoose';

let isConnected = false;
const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  mongoose.set('strictQuery', true);

  if (!MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to the .env.local file!');
  }

  if (isConnected) {
    throw new Error('Already connected to MongoDB!');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB: ${error}`);
  }
};

export default dbConnect;
