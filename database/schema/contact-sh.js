const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  email: String,
  message: String,
})

class ContactMessage {
  static async insertOneContact(contactSend) {
    const contact = await this.create(contactSend)
  }
}

contactSchema.loadClass(ContactMessage)

module.exports = contactSchema
