import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

export const connectToMongoDB = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(MONGO_URI);
  }
};
