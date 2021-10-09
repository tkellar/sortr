import app from './app';
import mongoose from 'mongoose';

const conn = process.env.MONGODB_CONNECTION;
if (conn) {
  mongoose
    .connect(conn)
    .then(() => console.log('Successfully connected to MongoDB instance at', conn))
    .then(() =>
      app.listen(process.env.SORTR_SERVER_PORT, () => {
        console.log('Listening on port', process.env.SORTR_SERVER_PORT);
      }),
    )
    .catch((err) => {
      console.log('Unable to establish connection to MongoDB database at', conn);
      console.error(err);
      process.exit(1);
    });
} else {
  console.log('Please provide a value for MONGODB_CONNECTION');
  process.exit(1);
}
