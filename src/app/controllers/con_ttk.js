const tikTokDAO = require("../bd/dao_ttk");
const bd = require("../../config/database");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./views/videos");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

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
            req.session.user = {
              id: usuario.id_user,
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

  inserirVideo() {
    return [
      upload.single("video"),
      function (req, res) {
        const usuarioDAO = new tikTokDAO(bd);
        const { titulo, som } = req.body;

        const id_user = req.session.user.id;
        const curtidas = 0; // Definindo a variável antes de utilizá-la

        const videoPath = req.file.path;

        usuarioDAO
          .inserirVideo(titulo, videoPath, som, id_user, curtidas)
          .then(() => {
            console.log("Vídeo inserido com sucesso");
            res.redirect("/home");
          })
          .catch((erro) => {
            console.log(erro);
            res.status(500).send("Erro ao inserir vídeo");
          });
      },
    ];
  }

  darCurtida() {
    return function (req, res) {
      const usuarioDAO = new tikTokDAO(bd);
      const { videoId } = req.body;
      const userId = req.session.user.id;

      usuarioDAO
        .verificarCurtida(videoId, userId) // Método a ser implementado no seu DAO
        .then((curtidaExiste) => {
          if (!curtidaExiste) {
            usuarioDAO
              .darCurtida(videoId, userId)
              .then(() =>
                res.json({
                  success: true,
                  message: "Curtida adicionada com sucesso",
                })
              )
              .catch((error) =>
                res.status(500).json({ success: false, message: error })
              );
          } else {
            usuarioDAO
              .removerCurtida(videoId, userId)
              .then(() =>
                res.json({
                  success: true,
                  message: "Curtida removida com sucesso",
                })
              )
              .catch((error) =>
                res.status(500).json({ success: false, message: error })
              );
          }
        })
        .catch((error) =>
          res.status(500).json({ success: false, message: error })
        );
    };
  }
}

module.exports = tiktokCON;
