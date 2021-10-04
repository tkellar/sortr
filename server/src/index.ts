import app from './app';
import mongoose from 'mongoose';
import { exit } from 'process';

const conn = process.env.MONGODB_CONNECTION;
if (conn) {
  mongoose.connect(conn, () => {
    console.log('Successfully connected to MongoDB instance at', conn);

    app.listen(process.env.SORTR_SERVER_PORT, () => {
      console.log(`Listening on port ${process.env.SORTR_SERVER_PORT}`);
    });
  });
} else {
  console.error('No MongoDB connection string provided');
  exit(1);
}
