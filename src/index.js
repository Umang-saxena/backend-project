import connectDB from "./db/index.js";
import dotenv from "dotenv";

// Import dotenv at start of app itself

dotenv.config();
connectDB();