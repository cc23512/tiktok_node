const app = require("./src/config/express");
const port = 3000;

app.listen(port, function () {
    console.log("Servidor na porta " + port);
})