require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')

const routes = require('./routes/index')

const portNumber = process.env.PORT || 3000
const app = express()

app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/', routes)

app.set('view engine', 'ejs')

app.listen(portNumber, () => {
  console.log(`Express web server started: ${portNumber}`)
})
