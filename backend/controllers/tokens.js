import { User } from '../models/user.js'
import { TokenGenerator } from '../models/token_generator.js'

export const TokensController = {

  Create: (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email }).then(async (user) => {
      if (!user) {
        // TODO: User.findOne error handler needs to be tested
        console.log('auth error: user not found')
        res.status(401).json({ message: 'auth error' })
      } else if (user.password !== password) {
        console.log('auth error: passwords do not match')
        res.status(401).json({ message: 'auth error' })
      } else {
        const token = await TokenGenerator.jsonwebtoken(user._id)
        res.status(201).json({ token, message: 'OK', user_id: user._id })
      }
    })
  }
}
