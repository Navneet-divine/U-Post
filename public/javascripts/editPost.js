const form = document.querySelector("form");
const btn = document.querySelector(".btn");

btn.addEventListener("click", (event) => {
    event.preventDefault(); 
    form.submit();
});