import mysql from 'mysql2/promise';
import mongoose from 'mongoose';
import Redis from 'ioredis';

// MySQL connection
export const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const mongoConnection = mongoose.connection;

// Redis client
export const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT!, 10),
  password: process.env.REDIS_PASSWORD,
});

mongoConnection.on('connected', () => {
  console.log('MongoDB connected');
});
mongoConnection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
