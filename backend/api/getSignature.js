const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

const getSignature = async (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request( { timestamp: timestamp }, process.env.API_SECRET);
    res.json({signature: signature, timestamp: timestamp});
}

module.exports = getSignature;