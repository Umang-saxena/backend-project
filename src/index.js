import connectDB from "./db/index.js";
import dotenv from "dotenv";
import express from "express";

// Import dotenv at start of app itself

dotenv.config();
const app=express()

connectDB() // We have connected it in async function so it returns a promise

.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{        
        console.log(`Server is running on port ${process.env.PORT || 8000}`);

    })
})
.catch((error)=>{
    console.log("Error in connecting to database: ", error);

})

