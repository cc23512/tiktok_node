class tikTokDAO {
  constructor(bd) {
    this._bd = bd;
  }

  inserirUsuario(nome, apelido, email, senha) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO tiktok_user (nome, apelido, email_user, senha_user) VALUES (?, ?, ?, ?)";

      this._bd.query(sql, [nome, apelido, email, senha], (erro) => {
        if (erro) {
          console.log(erro);
          return reject("erro ao inserir usuario");
        }
        resolve();
      });
    });
  }

  loginUsuario(email, senha) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM tiktok_user WHERE email_user = ? AND senha_user = ?";
      this._bd.query(sql, [email, senha], (erro) => {
        if (erro) {
          console.log(erro);
          return reject("informações de login incorretas");
        }
        if (resultados.length === 0) {
          return resolve(null); // nenhum usuario encontrado
        }
        const usuario = resultados[0];
        resolve(usuario); // intancia o usuario;
      });
    });
  }
}

module.exports = tikTokDAO;
