import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  await mongoose.connect(
    `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@mongodb:27017/linkapi-teste`
  );
};

export const close = (): Promise<void> => mongoose.connection.close();
