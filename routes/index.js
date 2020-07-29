const express = require('express')
const url = require('url')
const { Contact } = require('../database/index')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res) => {
  if (req.query) {
    const query = req.query
    res.render('index', { query })
  } else {
    res.render('index')
  }
})

router.post('/', async (req, res) => {
  const { email, message } = req.body

  try {
    const contact = req.body
    await Contact.insertOneContact(contact)
  } catch (error) {
    console.error(error)
  }

  res.redirect(
    302,
    url.format({
      pathname: '/',
      query: {
        email: !email ? 0 : 1,
        msg: !message ? 0 : 1,
        ruta: '#contacto',
      },
    })
  )
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    passReqToCallback: false,
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post(
  '/register',

  passport.authenticate('local-register', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    passReqToCallback: false,
  })
)

router.get('/profile', isLoggedIn, async (req, res) => {
  try {
    const contacts = await Contact.find({})
    res.render('profile', {
      user: req.user,
      contacts,
    })
  } catch {
    console.error(error)
  }
})

router.delete('/profile', async (req, res) => {
  const {
    body: { id },
  } = req
  console.log('TLC: id', id)
  try {
    const deleteRes = await Contact.findByIdAndDelete(id)
    console.log('TCL: deleteRes', deleteRes)
  } catch (err) {
    console.error(err)
  }
  res.redirect(302, '/profile')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/login')
}

module.exports = router
