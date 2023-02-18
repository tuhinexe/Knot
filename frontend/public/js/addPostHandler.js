// Listening to image field change

const imageFieldChanegd = document.querySelector("#input-file");
imageFieldChanegd.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const image = document.querySelector(".image-preview");
        image.src = reader.result;
        image.alt = file.name;
    };
    reader.onerror = (error) => {
        console.log(error);
    };
});

// Adding Image to Cloudinary and getting url
const getImageUrl = async (imageFile) => {
    const API_KEY = '196589649614855'
    const CLOUD_NAME = 'dj8uufxkn'
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
try{
    const sign = await fetch('/api/v1/get-signature', {
        method: 'POST'
        })
    
    const signJson = await sign.json();
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('api_key', API_KEY);
    formData.append('signature', signJson.signature);
    formData.append('timestamp', signJson.timestamp);
    const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData
    })
    const urlResponse = await response.json();
    return {
        url: urlResponse.secure_url,
        publicId: urlResponse.public_id
    }
} catch (err) {
    console.log(err);
}
};


// Submit button event listener
const submitBtn = document.querySelector(".submit-post");
submitBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = location.href;

    const content = document.querySelector("#content").value || '';
    const isImage =  imageFieldChanegd.files.length <= 0? false : true;
    
    const postInfo = {
        content,
        isImage,
        imgUrl: '',
        imgUpload: null,
        uploadedImgId: null
    };
    try{
        if(isImage){
            const imageFile = imageFieldChanegd.files[0];
            const {url, publicId} = await getImageUrl(imageFile);
            postInfo.imgUrl = url;
            postInfo.uploadedImgId = publicId;
        }
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postInfo),
        });
        if(response.redirected === true){
            location.reload();
            return;
        }

    } catch (err) {
        console.log(err);
    }
});
