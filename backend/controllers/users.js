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
    const pet = req.body.pet
    if (!pet) {
      res
        .status(400)
        .json({ message: 'Bad request: pet is null or undefined' })
      return
    }
    User.updateOne(
      { _id: userId },
      {
        // the pets property is an array of objects rather than a single object
        $set: { pets: [pet] }
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

  FindUserById: (req, res) => {
    // Extract user_id from params (Taken from :post_id in the url)
    const userId = req.params.user_id
    // Use user_id to find particular post
    User.findById({ _id: userId }, async (err, user) => {
      if (err) {
        throw err
      }
      // const token = await TokenGenerator.jsonwebtoken(req.user_id)
      // returns a body containing the post object and token string
      res.status(200).json({ user })
    })
  },
  addFakeUsers: async (req, res) => {
    await setupMockUser()
    await setupMockUser()
    await setupMockUser()
    res.status(200).json({ message: 'users added' })
  }
  // FindUserByToken: (req, res) => {
  //   User.findById({ _id: req.user_id }, async (err, user) => {
  //     if (err) {
  //       throw err
  //     }
  //     // const token = await TokenGenerator.jsonwebtoken(req.user_id)
  //     // returns a body containing the post object and token string
  //     const token = await TokenGenerator.jsonwebtoken(req.user_id)
  //     res.status(200).json({ token, user })
  //   })
  // }
}
