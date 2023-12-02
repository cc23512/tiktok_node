module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Orign", "*");
    next();
  });

  const tikTokController = require("../controllers/con_ttk");
  const tikController = new tikTokController();

  app.get("/", (req, res) => {
    res.send("Aoba");
  });

  app.get("/home", (req, res) => {
    res.render("index");
  });

  app.post("/inserirUsuario", tikController.inserirUsuario());
  app.post("/loginUsuario", tikController.loginUsuario());
};
