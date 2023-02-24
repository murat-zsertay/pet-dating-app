import { User } from '../models/user.js'

export const UsersController = {
  Create: async (req, res) => {
    const existingUser = await User.exists({ email: req.body.email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }
    const newUser = new User(req.body)
    newUser.save((err) => {
      if (err) res.status(400).json({ message: err.message })
      else {
        res.status(201).json({
          message: 'Thanks! your account has been successfully created'
        })
      }
    })
  },

  FindUserById: (req, res) => {
    // Extract user_id from params (Taken from :post_id in the url)
    const user_id = req.params.user_id
    // Use user_id to find particular post
    User.findById({ _id: user_id }, async (err, user) => {
      if (err) {
        throw err
      }
      // const token = await TokenGenerator.jsonwebtoken(req.user_id)
      // returns a body containing the post object and token string
      res.status(200).json({ user })
    })
  }
}
