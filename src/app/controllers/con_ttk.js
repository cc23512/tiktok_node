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
      const usuarioDAO = tikTokDAO(bd);
      const { email, senha } = req.body;
      usuarioDAO
        .loginUsuario(email, senha)
        .then((usuario) => {
          if (usuario) {
            req.session.user = usuario;
            console.log(usuario);
            res.redirect("/");
          } else {
            res.send("informações incorretas");
            console.log("informações incorretas");
          }
        })
        .catch((erro) => {
          console.log(erro);
          res.redirect("/");
        });
    };
  }
}

module.exports = tiktokCON;
