const express = require('express')
const url = require('url')

const { Contact } = require('../database/index')
const router = express.Router()

router.get('/', (req, res) => {
  //   console.log('req.query', req)
  if (req.query) {
    const formCookie = req.cookies['contact']
    const query = req.query
    res.render('index', { query, formCookie })
  } else {
    res.render('index')
  }
})

router.post('/', async (req, res) => {
  const { email, message } = req.body

  const formContent = { email: email, msg: message }

  try {
    const contact = req.body
    const result = await Contact.insertOneContact(contact)
  } catch (error) {
    console.error(error)
  }

  res.cookie('contact', formContent, { maxAge: 900000, httpOnly: true })
  res.redirect(
    302,
    url.format({
      pathname: '/',
      query: {
        email: !email ? 0 : 1,
        msg: !message ? 0 : 1,
        cont: '#contacto'
      }
    })
  )
})

module.exports = router
