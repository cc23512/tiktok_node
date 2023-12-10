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

  app.get("/home", async (req, res) => {
    try {
      const user = req.session.user;
      const videos = await usuarioDAO.listarVideos();

      videos.forEach((video) => {
        console.log("Informações do Vídeo:", video);
      });

      res.render("index", { user, videos });
    } catch (erro) {
      console.error(erro);
      res.status(500).send("Erro ao carregar vídeos");
    }
  });

  app.get("/uploadVideo", (req, res) => {
    const user = req.session.user;
    if (user) {
      res.render("uploadVideo", { user: user, req });
    } else {
      res.render("index", { mostrarPopup: true });
    }
  });

  app.post("/inserirUsuario", tikController.inserirUsuario());
  app.post("/loginUsuario", tikController.loginUsuario());
  app.post("/uploadVideo", tikController.inserirVideo());
};
