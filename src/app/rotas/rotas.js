module.exports = (app) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Orign', '*');
        next();
    })

    app.get('/', (req, res) => {
        res.send("Aoba")
    })

    app.get('/home', (req, res) => {
        res.render('../views/index');
    })
}