const bodyParser = require('body-parser')
const pessoasRoute = require('./pessoasRoute')
const niveisRoute = require('./niveisRoute')
const turmasRoute = require('./turmasRoute')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(pessoasRoute, niveisRoute, turmasRoute)
    app.get('/', (req, res) => res.status(200).send("Olá!"))
}
