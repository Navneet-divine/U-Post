const changeImage = document.querySelector(".img-container");
const input = document.querySelector("input");
const uploadForm = document.querySelector(".upload-form");

changeImage.addEventListener("click", () => {
  input.click();
});

input.addEventListener("change", () => {
  uploadForm.submit();
});
