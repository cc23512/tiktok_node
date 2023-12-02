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
