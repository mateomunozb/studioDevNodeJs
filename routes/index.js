const express = require('express')
const url = require('url')

const router = express.Router()

router.get('/', (req, res) => {
  //   console.log('req.query', req)
  if (req.query) {
    const formCookie = req.cookies['contact']
    console.log('formCookie', formCookie)
    const query = req.query
    console.log('query', query)
    res.render('index', { query, formCookie })
  } else {
    res.render('index')
  }
})

router.post('/', (req, res) => {
  console.log('TCL: req', req.body)
  const { email, message } = req.body

  const formContent = { email: email, msg: message }

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
