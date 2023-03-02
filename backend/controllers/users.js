import { User } from '../models/user.js'
import { TokenGenerator } from '../models/token_generator.js'
import { setupMockUser } from '../spec/utils.js'

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

  Update: (req, res) => {
    const userId = req.user_id
    const user = req.body.updatedUser
    if (!user) {
      res
        .status(400)
        .json({ message: 'Bad request: user is null or undefined' })
      return
    }
    User.updateOne(
      { _id: userId },
      {
        // the pets property is an array of objects rather than a single object
        $set: {
              email : user.email,
              firstName : user.firstName,
              lastName : user.lastName,
              password: user.password,
              postcode: user.postcode,
              pets: user.pets
            }
      },
      async (err) => {
        if (err) {
          res.status(400).json({ message: 'Bad request' })
        } else {
          const token = await TokenGenerator.jsonwebtoken(req.user_id)
          res.status(200).json({ token, message: 'OK' })
        }
      }
    )
  },
  addFakeUsers: async (req, res) => {
    await setupMockUser()
    await setupMockUser()
    await setupMockUser()
    res.status(200).json({ message: 'users added' })
  },
  FindUser: async (req, res) => {

  },
  FindUserById: (req, res) => {
    const userId = req.params.user_id

    User.findById({ _id: userId }, async (err, user) => {
      if (err) {
        throw err
      }
      if (req.params.user_id !== req.user_id) {
        Object.assign(user, { email: undefined, password: undefined })
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)

      res.status(200).json({ user, token })
    })
  }
}
