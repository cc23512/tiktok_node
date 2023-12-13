module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  const tikTokController = require("../controllers/con_ttk");
  const tikController = new tikTokController();

  const bd = require("../../config/database");
  const tikTokDAO = require("../bd/dao_ttk");
  const usuarioDAO = new tikTokDAO(bd);

  app.get("/", (req, res) => {
    res.send("Aoba");
  });

  app.get("/home", (req, res) => {
    const user = req.session.user;

    usuarioDAO
      .obterVideos()
      .then((videos) => {
        res.render("index", { user, videosTTK: videos });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Erro ao carregar a página inicial");
      });
  });

  app.get("/uploadVideo", (req, res) => {
    const user = req.session.user;

    if (user) {
      res.render("uploadVideo", { user: user, req });
    } else {
      res.redirect("/home");
    }
  });

  app.post("/curtirVideo/:videoId/:usuarioId", (req, res) => {
    const videoId = req.params.videoId;
    const usuarioId = req.params.usuarioId;

    // Verifique se o usuário já curtiu o vídeo
    usuarioDAO
      .verificarCurtida(usuarioId, videoId)
      .then((jaCurtiu) => {
        if (jaCurtiu) {
          // Se o usuário já curtiu, retorne o número atual de curtidas
          usuarioDAO
            .obterNumeroCurtidas(videoId)
            .then((numeroCurtidasAtualizado) => {
              res.json({ curtidas: numeroCurtidasAtualizado });
            })
            .catch((error) => {
              console.error("Erro ao obter o número de curtidas:", error);
              res.status(500).json({ error: "Erro interno do servidor" });
            });
        } else {
          // Caso contrário, incremente o número de curtidas
          usuarioDAO
            .registrarCurtida(usuarioId, videoId)
            .then(() => {
              // Retorne o novo número de curtidas
              usuarioDAO
                .obterNumeroCurtidas(videoId)
                .then((numeroCurtidasAtualizado) => {
                  res.json({ curtidas: numeroCurtidasAtualizado });
                })
                .catch((error) => {
                  console.error("Erro ao obter o número de curtidas:", error);
                  res.status(500).json({ error: "Erro interno do servidor" });
                });
            })
            .catch((error) => {
              console.error("Erro ao registrar a curtida:", error);
              res.status(500).json({ error: "Erro interno do servidor" });
            });
        }
      })
      .catch((error) => {
        console.error("Erro ao verificar a curtida:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
      });
  });

  app.post("/inserirUsuario", tikController.inserirUsuario());
  app.post("/loginUsuario", tikController.loginUsuario());
  app.post("/uploadVideo", tikController.inserirVideo());
};
