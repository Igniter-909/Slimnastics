import {v2 as cloudinary} from "cloudinary";
import logger from "../../logger.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (fileBuffer, originalname) => {
    try {
        if (!fileBuffer) return null;

        // Convert buffer to base64
        const fileStr = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;

        const response = await cloudinary.uploader.upload(fileStr, {
            resource_type: 'auto',
            public_id: `${Date.now()}-${originalname}`,
        });

        logger.info("File uploaded on cloudinary. File src: " + response.url);
        return response;
    } catch (error) {
        logger.error("Error uploading to cloudinary: ", error);
        return null;
    }
};

export { uploadOnCloudinary };

