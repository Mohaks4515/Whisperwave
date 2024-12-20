const cloudinary = require('../config/cloudinaryConfig');
const sharp = require('sharp');

const uploadImageToCloudinary = async (file, folder) => {
    try {
        // Use sharp to compress the image
        const compressedImageBuffer = await sharp(file.buffer)
            .jpeg({ quality: 70 })
            .toBuffer();

        const result = await new Promise((resolve) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: `images`,
                    upload_preset: 'chatApp',
                },
                (error, result) => {
                    if (error) 
                    {
                        console.log("Error: ", error);
                        return;
                    }
                    else resolve(result);
                }
            );
            uploadStream.end(compressedImageBuffer);
        });

        return result.secure_url;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = { uploadImageToCloudinary };
