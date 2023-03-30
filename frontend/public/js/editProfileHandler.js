const successMessage = document.querySelector(".success-modal");

if (successMessage) {
  console.log(successMessage);
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 2000);
}

const errorMessage = document.querySelector(".submit-fail-text");

if (errorMessage) {
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 5000 );
}
