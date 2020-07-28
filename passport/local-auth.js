const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const { User } = require('../database/index')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(
  'local-register',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        username: username,
        password: password,
      }
      try {
        const userExisting = await User.findExistingUser(newUser)
        if (userExisting) {
          return done(null, false, req.flash('message', userExisting))
        } else {
          const createdUser = await User.encryptPasswordAndInsertOneUser(
            newUser
          )
          done(null, createdUser)
          console.log('TLC: newUser', createdUser)
        }
      } catch (error) {
        console.error(error)
      }
    }
  )
)

passport.use(
  'local-login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const user = await User.findUserAndComparePassword(username, password)
        if (typeof user === 'string') {
          return done(null, false, req.flash('message', user))
        } else return done(null, user)
      } catch (error) {
        console.error(error)
      }
    }
  )
)
