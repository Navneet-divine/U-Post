const passwordInput = document.getElementById('password');
const visibilityToggle = document.getElementById('visibilityToggle');

visibilityToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    visibilityToggle.classList.toggle('fa-eye');
    visibilityToggle.classList.toggle('fa-eye-slash');
});