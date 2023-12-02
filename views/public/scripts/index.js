// modal formulario login
const modal = document.getElementById("modal");
const loginButton = document.getElementById("login");
const loginForm = document.getElementById("loginForm");

loginButton.addEventListener("click", openModal);
loginForm.addEventListener("submit", handleSubmit);

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function handleSubmit(event) {
  event.preventDefault();
  closeModal();
}

// mostrar formulario de cadastro quando clica em criar conta
function showSignupForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

// mortrar formulariode login quando clica em entrar
function showLoginForm() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}
