const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
})

class User {
  //newUser = {name, email, password, username}
  static async encryptPasswordAndInsertOneUser(newUser) {
    const { password, ...rest } = newUser
    const passwordHashed = await bcrypt.hash(password, 10)
    return this.create({
      ...rest,
      password: passwordHashed,
    })
  }

  static async findExistingUser(user) {
    const emailExisting = await this.findOne({ email: user.email })
    const usernameExisting = await this.findOne({ username: user.username })

    if (emailExisting) {
      return `El email ya existe`
    } else if (usernameExisting) {
      return `El nombre de usuario ya existe`
    }
  }

  static async findUserAndComparePassword(user) {
    const userExisting = await this.findOne({ username: user.username })
    const compare = await bcrypt.compare(user.password, this.password)

    if (!userExisting) {
      return `El usuario no existe`
    } else if (!compare) return 'La contraseña es incorrecta'
  }
}

userSchema.loadClass(User)

module.exports = userSchema
