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
        res.render("index", { user, videosTTK: videos, req });
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

  app.post("/inserirUsuario", tikController.inserirUsuario());
  app.post("/loginUsuario", tikController.loginUsuario());
  app.post("/uploadVideo", tikController.inserirVideo());

  app.post("/darCurtida", tikController.darCurtida());
  app.post("/api/darCurtida", tikController.darCurtida());
};
