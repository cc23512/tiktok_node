function abrirModal() {
  document.getElementById("modal").style.display = "block";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

function abreCadastroFormulario() {
  // ocultar form login
  document.getElementById("loginForm").style.display = "none";

  // mostra form login
  document.getElementById("cadastroForm").style.display = "block";
}

function voltaParaLoginForm() {
  // oculta form cadsastro
  document.getElementById("cadastroForm").style.display = "none";

  // mostra form cadastro
  document.getElementById("loginForm").style.display = "block";
}
