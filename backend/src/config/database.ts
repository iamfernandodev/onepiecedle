import mongoose from 'mongoose';
import sendLog from '../utils/sendLog';

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    sendLog({
      color: "green",
      message: "Database connected."
    })
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};