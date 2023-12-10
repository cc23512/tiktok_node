module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  const tikTokController = require("../controllers/con_ttk");
  const tikController = new tikTokController();

  app.get("/", (req, res) => {
    res.send("Aoba");
  });

  app.get("/home", (req, res) => {
    // armazena as info do usuario para aparecer quando ele logar
    const user = req.session.user;
    res.render("index", { user: user });
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
