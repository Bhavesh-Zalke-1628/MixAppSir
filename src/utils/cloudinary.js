import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // uplod the file 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        // file has been uploaded successfully 
        console.log('file has been uploaded successfully', response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally save temproty file asthe upload got failed
    }
}


export { uploadOnCloudinary }