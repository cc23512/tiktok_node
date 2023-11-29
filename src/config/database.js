const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'regulus.cotuca.unicamp.br',
    user: 'BD23512',
    password: 'BD23512',
    database: 'BD23512',
})

connection.connect(function (erro) {
    if (erro) {
        console.log("erro na conexão com o BD23512");
        console.log(erro);
    } else {
        console.log("conexão CONECTADA BD23512");
    }
})

module.exports = connection;