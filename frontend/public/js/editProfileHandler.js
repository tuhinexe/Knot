import { getImageUrl } from "../utils/imageUrl.js";

const imageFieldChanegd = document.querySelector("#update-profile-pic");
imageFieldChanegd.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const image = document.querySelector("#profilePicPreview");
    image.src = reader.result;
    image.alt = file.name;
  };
  reader.onerror = (error) => {
    console.log(error);
  };
});

const editProfileSubmit = document.querySelector(".edit-profile-form");
editProfileSubmit.addEventListener("submit", async (e) => {
  e.preventDefault();
  const updateBtn = document.querySelector("#updateProfileBtn");
  updateBtn.style.pointerEvents = "none";
  updateBtn.value = "Updating...";
  const formData = new FormData(editProfileSubmit);
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const username = formData.get("username");
  const bio = formData.get("bio");
  const dob = formData.get("dob");
  let profilePic = formData.get("profilePic");
  if (profilePic.name !== "") {
    profilePic = await getImageUrl(profilePic);
  } else {
    profilePic = { url: "" };
  }
  const body = {
    firstname,
    lastname,
    username,
    profilePic: profilePic.url,
    bio,
    dob,
  };
  try{
    const response = await fetch("/profile/update", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "accept-patch": "application/json",
      },
    });
    if (response) {
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }

});