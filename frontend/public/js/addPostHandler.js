console.log("addPost.js loaded");

//  Post data via fetch

const sendPostData = async (url, data) => {
    try{
        await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch (err) {
        console.log(err);
    }
    
};

// Image to dataURL with fileReader
const convertImage = async () => {
    return new Promise((resolve, reject) => {
        const file = document.querySelector("#input-file").files[0];
        !file && resolve('');
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });

};


// Submit button event listener
const submitBtn = document.querySelector(".submit");
submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const content = document.querySelector("#content").value;
    if(!content) return ;
    const imageResult = await convertImage();
    const data = {
        content: content,
        basedImage: imageResult || '',
    };
    sendPostData(location.href, data);
});
