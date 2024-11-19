import mongoose from 'mongoose';

// Ensure MONGO_URI is defined
const MONGO_URI = process.env.MONGO_URI as string || '';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

// Cache connection for performance
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB with caching
 */
async function dbConnect() {
  // If the connection is already established, return the cached connection
  if (cached.conn) {
    console.log('Using existing MongoDB connection');
    return cached.conn;
  }

  // If there is no cached connection, initiate a new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering for performance
    };

    // Create a promise for the database connection
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    }).catch((error) => {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Failed to connect to MongoDB');
    });
  }

  // Wait for the connection to be established and cache it
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
