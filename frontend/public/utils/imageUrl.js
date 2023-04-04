const getImageUrl = async (imageFile) => {
    if(imageFile === "") return;
    const API_KEY = "196589649614855";
    const CLOUD_NAME = "dj8uufxkn";
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    try {
      const sign = await fetch("/api/v1/get-signature", {
        method: "POST",
      });
  
      const signJson = await sign.json();
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("api_key", API_KEY);
      formData.append("signature", signJson.signature);
      formData.append("timestamp", signJson.timestamp);
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });
      const urlResponse = await response.json();
      return {
        url: urlResponse.secure_url,
        publicId: urlResponse.public_id,
      };
    } catch (err) {
      console.log(err);
    }
  };

export {getImageUrl};