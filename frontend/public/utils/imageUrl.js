const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};


const compressImage = async (file) => {
  const image = new Image();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      image.src = e.target.result;
      image.onload = () => {
        const width = image.width;
        const height = image.height;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.5);
        const compressedFile = dataURLtoFile(dataUrl, file.name);
        resolve(compressedFile);
      };
    }

    reader.onerror = (err) => {
      reject(err);
    };
  });

};




const getImageUrl = async (imageFile) => {

  if(imageFile === "") return;
  const compressedImage = await compressImage(imageFile);
  const API_KEY = "196589649614855";
  const CLOUD_NAME = "dj8uufxkn";
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  try {
    const sign = await fetch("/api/v1/get-signature", {
      method: "POST",
    });

    const signJson = await sign.json();
    const formData = new FormData();
    // compress the image using canvas
  
    formData.append("file", compressedImage);
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