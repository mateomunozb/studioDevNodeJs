require('dotenv').config()

const contactSchema = require('./schema')

const { model, connect, connection } = require('mongoose')

connect(process.env.URI, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error('Error'))

connection.on('open', () => {
  console.log('Database is connected to', process.env.URI)
})

const Contact = model('ContactCollection', contactSchema)

module.exports = {
  Contact
}
