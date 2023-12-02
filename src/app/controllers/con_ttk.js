// con_ttk.js
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

  loginUsuario(email, senha) {
    return new Promise((resolve, reject) => {
      const usuarioDAO = new tikTokDAO(bd);

      usuarioDAO
        .loginUsuario(email, senha)
        .then((usuario) => {
          resolve(usuario);
        })
        .catch((erro) => {
          console.log(erro);
          reject("erro ao verificar login");
        });
    });
  }
}

module.exports = tiktokCON;
