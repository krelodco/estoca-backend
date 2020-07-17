const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send({ hello: "world" })
})

require('./app/controllers/authControler')(app)

app.listen(PORT)