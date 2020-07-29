require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const morgan = require('morgan')
const flash = require('connect-flash')
const methodOverride = require('method-override')

//Inicializations
const app = express()
const htmlapp = require('./routes/index')
const portNumber = process.env.PORT || 3000
require('./passport/local-auth')

//Settings
app.set('view engine', 'ejs')

//middlewares
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(
  session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method
      delete req.body._method
      return method
    }
  })
)
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.message = req.flash('message')
  next()
})

//Routes
app.use('/', htmlapp)

//Server
app.listen(portNumber, () => {
  console.log(`Express web server started: ${portNumber}`)
})
