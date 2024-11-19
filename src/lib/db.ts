import { env } from "@/config/env/server";
import mongoose from "mongoose";

async function connectToMongo() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log(`Connected to mongoDB`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    // process.exit(1); //if connection is not successfull shutdown the app
  }
}

export default connectToMongo;
