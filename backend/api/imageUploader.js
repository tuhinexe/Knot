const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

// Upload image to cloudinary
const uploadImage = async (image) => {
    const result = await cloudinary.uploader.upload(image);
    return result.url;
    };

module.exports = uploadImage;