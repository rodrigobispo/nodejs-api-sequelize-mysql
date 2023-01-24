const express = require('express')

const app = express()

app.use(express.json())

const port = 3000

app.get('/teste', (req, res) => {
    res.status(200).send({mensagem: "Boas-vindas a API."})
})

app.listen(port, () => console.log(`Servidor escutando na porta ${port}`))

module.exports = app
