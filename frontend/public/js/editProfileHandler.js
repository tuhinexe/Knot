const successMessage = document.querySelector(".success-flash");

if (successMessage) {
  console.log(successMessage);
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 5000);
}

const errorMessage = document.querySelector(".fail-flash");

if (errorMessage) {
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 5000 );
}
