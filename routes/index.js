const express = require('express')
const url = require('url')

const { Contact } = require('../database/index')
const router = express.Router()

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
        ruta: '#contacto'
      }
    })
  )
})

module.exports = router
