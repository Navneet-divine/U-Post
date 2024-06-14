const editBtn = document.querySelector(".edit-btn");
const editBtnForm = document.querySelector(".edit-btn-form");

editBtn.addEventListener("click", (event) => {
event.preventDefault(); 
editBtnForm.submit();
});