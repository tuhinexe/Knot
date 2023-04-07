import { getImageUrl } from "../utils/imageUrl.js";

// Listening to image field change

const imageFieldChanegd = document.querySelector("#input-file");
imageFieldChanegd &&
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

// Submit button event listener
const submitBtn = document.querySelector(".submit-post");
submitBtn &&
  submitBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const postBtn = document.querySelector("#post-submit-btn");
    let url = "";
    if (location.href.includes("/post/add")) {
      url = location.href;
    } else {
      url = location.href + "post/add";
    }
    const errorSpan = document.querySelector("#error-span");

    const content = document.querySelector("#content").value || "";
    if (content.length > 500) {
      errorSpan.style.textAlign = "center";
      errorSpan.innerHTML =
        "Sorry! but bloggin is not allowed here <br> Keep your content short and sweet 🤞";
      return;
    }
    const isImage = imageFieldChanegd.files.length <= 0 ? false : true;
    if (content.length <= 0 && !isImage) {
      let randomNumber = Math.floor(Math.random() * 2);
      errorSpan.style.textAlign = "center";
      errorSpan.innerHTML =
        randomNumber === 0
          ? `Please add content <br> "Something" is better than "Nothing" 🤞`
          : `Please add content <br> We need to hear something from you! 🤞`;
      return;
    } else {
      errorSpan.innerHTML = "";
      postBtn.disabled = true;
      postBtn.value = "Posting...";
    }

    const postInfo = {
      content,
      isImage,
      imgUrl: "",
      imgUpload: null,
      uploadedImgId: null,
    };
    try {
      if (isImage) {
        const imageFile = imageFieldChanegd.files[0];
        const { url, publicId } = await getImageUrl(imageFile);
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
      if (response) {
        const data = await response.json();
        if (data.success) {
          window.location.href = "/";
        } else {
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
