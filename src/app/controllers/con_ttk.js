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
            // armazena as info do usuario no req.session
            req.session.user = {
              id: usuario.id_user, // Altere para id_user, que é o nome correto do campo
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

        // Obtém o ID do usuário da sessão
        const id_user = req.session.user.id;

        const videoPath = req.file.path;

        usuarioDAO
          .inserirVideo(titulo, videoPath, som, id_user)
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
}

module.exports = tiktokCON;
