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

  verificarCurtida(usuarioId, videoId) {
    const sql = "SELECT * FROM curtidas WHERE id_user = ? AND id_video = ?";
    return new Promise((resolve, reject) => {
      this._bd.query(sql, [usuarioId, videoId], (erro, resultado) => {
        if (erro) {
          console.error("Erro ao verificar a curtida:", erro);
          reject(erro);
        } else {
          resolve(resultado.length > 0);
        }
      });
    });
  }

  registrarCurtida(usuarioId, videoId) {
    const selectCurtidaSql = "SELECT * FROM curtidas WHERE id_user = ? AND id_video = ?";
    const insertCurtidaSql = "INSERT INTO curtidas (id_user, id_video) VALUES (?, ?)";
    const updateCurtidasSql = "UPDATE tiktok_video SET curtidas = curtidas + 1 WHERE id_video = ?";

    return new Promise((resolve, reject) => {
      this._bd.beginTransaction((err) => {
        if (err) {
          console.error("Erro ao iniciar a transação:", err);
          reject(err);
        }

        // Verifica se já existe uma curtida do usuário no vídeo
        this._bd.query(selectCurtidaSql, [usuarioId, videoId], (err, results) => {
          if (err) {
            this._bd.rollback(() => reject(err));
          }

          if (results.length === 0) {
            // Se o usuário ainda não curtiu, insere a curtida e atualiza o número de curtidas
            this._bd.query(insertCurtidaSql, [usuarioId, videoId], (err) => {
              if (err) {
                this._bd.rollback(() => reject(err));
              }

              this._bd.query(updateCurtidasSql, [videoId], (err) => {
                if (err) {
                  this._bd.rollback(() => reject(err));
                }

                this._bd.commit((err) => {
                  if (err) {
                    this._bd.rollback(() => reject(err));
                  }
                  resolve();
                });
              });
            });
          } else {
            // Se o usuário já curtiu, apenas atualiza o número de curtidas
            this._bd.query(updateCurtidasSql, [videoId], (err) => {
              if (err) {
                this._bd.rollback(() => reject(err));
              }

              this._bd.commit((err) => {
                if (err) {
                  this._bd.rollback(() => reject(err));
                }
                resolve();
              });
            });
          }
        });
      });
    });
  }

  obterNumeroCurtidas(videoId) {
    const sql = "SELECT COUNT(*) as curtidas FROM curtidas WHERE id_video = ?";
    return new Promise((resolve, reject) => {
      this._bd.query(sql, [videoId], (erro, resultado) => {
        if (erro) {
          console.error("Erro ao obter o número de curtidas:", erro);
          reject(erro);
        } else {
          resolve(resultado[0].curtidas);
        }
      });
    });
  }
}

module.exports = tikTokDAO;
