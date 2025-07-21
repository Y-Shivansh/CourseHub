/*
    For this, file is coming from my local server, whoch is already uploaded using multer.
    so I also have to remove file from my own server. 
*/

import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config(); 
import fs from "fs" // filesystem

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("No file path provided");
            return null;
        }

        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image"
        });

        console.log("Uploaded to Cloudinary:", res.secure_url);
        return res;

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);

        // Safe delete
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};
