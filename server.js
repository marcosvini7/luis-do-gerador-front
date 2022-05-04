const express = require('express')
const app = express()
const porta = process.env.PORT || '3000'

app.use(express.static(__dirname + '/dist/'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(porta, () => {
    console.log('Servidor rodando com Express na porta 3000')
})