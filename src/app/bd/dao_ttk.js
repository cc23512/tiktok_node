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

  autenticarUsuario(email, senha) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM tiktok_user WHERE email_user = ? AND senha_user = ?";
      this._bd.query(sql, [email, senha], (erro, resultados) => {
        if (erro) {
          console.error("Erro na consulta SQL:", erro);
          return reject("Erro ao autenticar usuário");
        }

        if (resultados.length > 0) {
          console.log("Usuário autenticado:", resultados[0]);
          resolve(resultados[0]);
        } else {
          console.log("Usuário não encontrado");
          resolve(null);
        }
      });
    });
  }
}

module.exports = tikTokDAO;
