import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance= await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is connected to ${DB_NAME}`);
        console.log("Mongo DB Connection Instance: ", connectionInstance.connection.host);
    } catch (error) {
        console.log("MOngo Db connection error: ", error);
        process.exit(1); // Function of node...can also use throw error
    }
};

export default connectDB;



