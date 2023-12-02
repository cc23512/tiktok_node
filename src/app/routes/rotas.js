// routes.js
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
    res.render("index");
  });

  app.post("/inserirUsuario", tikController.inserirUsuario());
  app.post("/loginUsuario", (req, res) => {
    const { email, senha } = req.body;

    tikController
      .loginUsuario(email, senha)
      .then((usuario) => {
        if (usuario) {
          req.session.user = usuario;
          console.log(usuario);
          res.send("aoba");
        } else {
          res.send("deu errado");
          console.log("informações incorretas");
        }
      })
      .catch((erro) => {
        console.log(erro);
        res.send("erro");
      });
  });
};
