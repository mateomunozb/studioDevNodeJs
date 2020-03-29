require('dotenv').config()
const express = require('express')

const portNumber = process.env.PORT || 3000

const app = express()

const routes = require('./routes/index')

app.use(express.static('public'))
app.use('/', routes)

app.set('view engine', 'ejs')

app.listen(portNumber, () => {
  console.log(`Express web server started: ${portNumber}`)
})
