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

  inserirVideo(titulo, videoPath, som, id_user, curtidas) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO tiktok_video (titulo, video, som, id_user, curtidas) VALUES (?, ?, ?, ?, ?)";

      this._bd.query(
        sql,
        [titulo, videoPath, som, id_user, curtidas],
        (erro) => {
          if (erro) {
            console.log(erro);
            return reject("Erro ao inserir vídeo");
          }
          resolve();
        }
      );
    });
  }

  obterVideos() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT v.*, u.apelido AS apelido_usuario, u.nome AS nome_usuario
        FROM tiktok_video v
        JOIN tiktok_user u ON v.id_user = u.id_user
        ORDER BY v.data_postagem DESC
      `;
      // seleciona tudo da tabela video, e apelido da tabela usuario é apelido_usuario
      // ai o id_user da tabela video receebe o id_user da tabela usuario fazendo assim
      // que os dados estejam relacionados e depois organiza os videos por ordem de
      // postagem;
      this._bd.query(sql, (erro, resultados) => {
        if (erro) {
          console.error("Erro na consulta SQL:", erro);
          return reject("Erro ao obter vídeos");
        }
        resolve(resultados);
      });
    });
  }

  verificarCurtida(videoId, userId) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM curtidas WHERE id_video = ? AND id_user = ?";
      this._bd.query(sql, [videoId, userId], (erro, resultados) => {
        if (erro) {
          console.error("Erro ao verificar curtida:", erro);
          return reject("Erro ao verificar curtida");
        }

        resolve(resultados.length > 0); // Se houver resultados, significa que a curtida existe
      });
    });
  }

  darCurtida(idVideo, userId) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE tiktok_video SET curtidas = curtidas + 1 WHERE id_video = ?";
      this._bd.query(sql, [idVideo], (erro) => {
        if (erro) {
          console.error("Erro ao dar curtida:", erro);
          return reject("Erro ao dar curtida");
        }
        this._bd.query(
          "SELECT curtidas FROM tiktok_video WHERE id_video = ?",
          [idVideo],
          (erro, resultados) => {
            if (erro) {
              console.error("Erro ao obter número de curtidas:", erro);
              return reject("Erro ao obter número de curtidas");
            }
            const curtidas = resultados[0] ? resultados[0].curtidas : 0;
            resolve(curtidas);
          }
        );
      });
    });
  }

  removerCurtida(videoId, userId) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM curtidas WHERE id_video = ? AND id_user = ?";
      this._bd.query(sql, [videoId, userId], (erro) => {
        if (erro) {
          console.error("Erro ao remover curtida:", erro);
          return reject("Erro ao remover curtida");
        }

        resolve();
      });
    });
  }
}

module.exports = tikTokDAO;
