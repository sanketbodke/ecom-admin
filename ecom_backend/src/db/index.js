import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
  try{
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_LOCAL_URI}/${DB_NAME}`
    );
    console.log(`MONGOOSE CONNECTED TO DB!! ${connectionInstance.connection.host}`);
  } catch (error){
    console.log(`MONGOOSE FAILED TO CONNECT : ${error}`);
  }
}

export { connectDB }