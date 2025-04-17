import {v2 as cloudinary} from "cloudinary";

import fs from "fs"; //File system module is a utility from node js to read files from local storage

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your Cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API key
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if (!localFilePath) return null; // If no file path is provided, return null

        const response = await cloudinary.uploader.upload (localFilePath,{
            resource_type: "auto",

        })
        //File has been uploaded to cloudinary successfully
        console.log("File uploaded successfully to Cloudinary",response.url);
        return response; //Return the response from cloudinary which contains the url of the file uploaded
    }catch(error){
        fs.unlinkSync(localFilePath); //Delete the file from local storage if there is an error in uploading to cloudinary
        return null;
    }
}
export {uploadOnCloudinary}; //Export the function to use in other files