const tikTokDAO = require("../bd/dao_ttk");
const bd = require("../../config/database");

class tiktokCON {
  inserirUsuario() {
    return function (req, res) {
      const usuarioDAO = new tikTokDAO(bd);
      const { nome, apelido, email, senha } = req.body;

      usuarioDAO
        .inserirUsuario(nome, apelido, email, senha)
        .then(() => {
          console.log("usuario inserido com sucesso");
          res.redirect("/home");
        })
        .catch((erro) => {
          console.log(erro);
          console.log("erro ao inserir usuario");
        });
    };
  }

  loginUsuario() {
    return function (req, res) {
      const usuarioDAO = new tikTokDAO(bd);
      const { email, senha } = req.body;

      usuarioDAO
        .autenticarUsuario(email, senha)
        .then((usuario) => {
          if (usuario) {
            // armazena as info do usuario no req.session
            req.session.user = {
              id: usuario.id,
              nome: usuario.nome,
              apelido: usuario.apelido,
              email: usuario.email,
            };
            res.redirect("/home");
          } else {
            res.status(401).send("Credenciais inválidas");
          }
        })
        .catch((erro) => {
          console.log(erro);
          res.status(500).send("Erro no servidor");
        });
    };
  }
}

module.exports = tiktokCON;
