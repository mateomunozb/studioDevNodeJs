require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')

const htmlapp = require('./routes/index')
const login = require('./routes/login')
const register = require('./routes/register')

const portNumber = process.env.PORT || 3000
const app = express()

app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/', htmlapp)
app.use('/login', login)
app.use('/register', register)

app.set('view engine', 'ejs')

app.listen(portNumber, () => {
  console.log(`Express web server started: ${portNumber}`)
})
